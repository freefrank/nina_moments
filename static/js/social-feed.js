// Twitter-like Social Feed Dynamic Loading
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const socialFeed = document.getElementById('social-feed');
    const loadMoreContainer = document.getElementById('load-more-container');
    
    // 清理作者信息
    function removeAuthorInfo() {
        const feedFooters = document.querySelectorAll('.feed-footer');
        feedFooters.forEach(footer => {
            const text = footer.textContent;
            if (text.includes('·')) {
                // 只保留第一个分隔符前的内容（日期）
                const parts = text.split('·');
                if (parts.length > 1) {
                    footer.textContent = parts[0].trim();
                }
            }
        });
    }
    
    // 条目的跳转由 .feed-link 这个覆盖整个卡片的 <a> 原生承担，这里只做内容清理
    function addFeedEntryClickHandlers() {
        removeAuthorInfo();
    }

    addFeedEntryClickHandlers();
    
    // 初始化侧边栏功能
    initSidebar();
    
    if (!loadMoreBtn || !socialFeed) {
        return; // 如果没有相关元素，直接返回
    }
    
    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        loadNextPage();
    });

    // ===== 列表状态的保存与恢复 =====
    // 信息流是 JS 逐页追加的，返回时浏览器只会重建第一页，
    // 于是滚动位置无处可落、页面弹回最新的一天。这里自己把状态存起来。
    const FEED_STATE_KEY = 'feed-state:' + window.location.pathname;
    const FEED_STATE_MAX = 2 * 1024 * 1024; // 超过就放弃保存，避免撑爆 sessionStorage

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    function saveFeedState() {
        try {
            const html = socialFeed.innerHTML;
            if (html.length > FEED_STATE_MAX) {
                sessionStorage.removeItem(FEED_STATE_KEY);
                return;
            }
            const activeYearBtn = document.querySelector('.year-btn.active');
            const activeMonthBtn = document.querySelector('.month-btn.active');
            sessionStorage.setItem(FEED_STATE_KEY, JSON.stringify({
                html: html,
                scrollY: window.scrollY,
                nextUrl: loadMoreBtn.getAttribute('data-next-url'),
                hasMore: loadMoreContainer ? loadMoreContainer.style.display !== 'none' : false,
                activeYear: activeYearBtn ? activeYearBtn.dataset.year : null,
                activeMonth: activeMonthBtn ? activeMonthBtn.dataset.month : null
            }));
        } catch (e) {
            // 配额超限或隐私模式下禁用了 storage，放弃保存即可
        }
    }

    function restoreFeedState() {
        // 只有后退/前进和刷新才恢复；主动导航回首页时应当看到最新内容
        const navEntry = performance.getEntriesByType('navigation')[0];
        const navType = navEntry ? navEntry.type : '';
        if (navType !== 'back_forward' && navType !== 'reload') return;

        let raw = null;
        try {
            raw = sessionStorage.getItem(FEED_STATE_KEY);
        } catch (e) {
            return;
        }
        if (!raw) return;

        let state;
        try {
            state = JSON.parse(raw);
        } catch (e) {
            return;
        }
        if (!state || !state.html) return;

        socialFeed.innerHTML = state.html;
        if (state.nextUrl) {
            loadMoreBtn.setAttribute('data-next-url', state.nextUrl);
        }
        if (loadMoreContainer) {
            loadMoreContainer.style.display = state.hasMore ? '' : 'none';
        }

        // 恢复侧边栏的筛选高亮，使其与信息流内容一致
        if (state.activeYear) {
            const yearBtn = document.querySelector(`.year-btn[data-year="${state.activeYear}"]`);
            if (yearBtn) yearBtn.classList.add('active');
        }
        if (state.activeMonth && state.activeYear) {
            const monthBtn = document.querySelector(
                `.month-btn[data-year="${state.activeYear}"][data-month="${state.activeMonth}"]`);
            if (monthBtn) monthBtn.classList.add('active');
        }

        addFeedEntryClickHandlers();

        // 等一帧让恢复出来的条目完成布局，滚动位置才落得准
        requestAnimationFrame(() => window.scrollTo(0, state.scrollY || 0));
    }

    // pagehide 对 bfcache 友好；点开 post、刷新、关闭标签页都会触发
    window.addEventListener('pagehide', saveFeedState);

    function loadNextPage() {
        let nextUrlString = loadMoreBtn.getAttribute('data-next-url');
        if (!nextUrlString) {
            return;
        }

        // 修正URL以处理本地开发环境中的http/https混合内容问题
        const normalizeUrl = (urlStr) => {
            try {
                const url = new URL(urlStr);
                // 在本地开发时，强制协议和主机与当前窗口匹配，以避免CORS错误
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    url.protocol = window.location.protocol;
                    url.host = window.location.host;
                }
                return url.toString();
            } catch (e) {
                console.error("无效的URL:", urlStr, e);
                return null; // 返回null表示URL无效
            }
        };

        const finalUrl = normalizeUrl(nextUrlString);
        if (!finalUrl) {
            console.error('无法加载下一页，URL无效。');
            return;
        }
        
        // 设置加载状态
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.textContent = '加载中';
        
        // 发送请求获取下一页
        fetch(finalUrl)
            .then(response => {
                if (!response.ok) {
                    // 抛出错误，包含状态码，以便更好地调试
                    throw new Error(`网络请求失败，状态码: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // 解析HTML
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // 提取新的文章
                const newFeedEntries = doc.querySelectorAll('.feed-entry');
                
                if (newFeedEntries.length > 0) {
                    // 添加新文章到现有信息流
                    newFeedEntries.forEach(entry => {
                        // 移除原来的边框圆角，因为不再是最后一个
                        const lastEntry = socialFeed.querySelector('.feed-entry:last-child');
                        if (lastEntry) {
                            lastEntry.style.borderRadius = '0';
                        }
                        
                        socialFeed.appendChild(entry.cloneNode(true));
                    });
                    
                    // 更新最后一个条目的样式
                    const newLastEntry = socialFeed.querySelector('.feed-entry:last-child');
                    if (newLastEntry) {
                        newLastEntry.style.borderRadius = '0 0 12px 12px';
                    }
                    
                    // 为新添加的条目添加点击处理
                    addFeedEntryClickHandlers();
                }
                
                // 检查是否还有下一页
                const nextLoadMoreBtn = doc.getElementById('load-more-btn');
                if (nextLoadMoreBtn) {
                    const nextNextUrlString = nextLoadMoreBtn.getAttribute('data-next-url');
                    if (nextNextUrlString) {
                        const finalNextNextUrl = normalizeUrl(nextNextUrlString);
                        if (finalNextNextUrl) {
                            loadMoreBtn.setAttribute('data-next-url', finalNextNextUrl);
                        } else {
                            loadMoreContainer.style.display = 'none';
                        }
                    } else {
                        // 没有更多页面了
                        loadMoreContainer.style.display = 'none';
                    }
                } else {
                    // 没有更多页面了
                    loadMoreContainer.style.display = 'none';
                }
                
                // 平滑滚动到新内容
                if (newFeedEntries.length > 0) {
                    const firstNewEntry = socialFeed.querySelector('.feed-entry:nth-last-child(' + newFeedEntries.length + ')');
                    if (firstNewEntry) {
                        firstNewEntry.scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                }
            })
            .catch(error => {
                console.error('加载失败:', error);
                loadMoreBtn.textContent = '加载失败，点击重试';
                
                // 3秒后恢复按钮状态
                setTimeout(() => {
                    resetLoadMoreButton();
                }, 3000);
            })
            .finally(() => {
                // 如果没有出错，重置按钮状态
                if (loadMoreBtn.textContent !== '加载失败，点击重试') {
                    resetLoadMoreButton();
                }
            });
    }
    
    function resetLoadMoreButton() {
        loadMoreBtn.disabled = false;
        loadMoreBtn.classList.remove('loading');
        loadMoreBtn.textContent = '加载更多...';
    }
    
    // 可选：实现无限滚动
    let isAutoLoading = false;
    
    function checkAutoLoad() {
        if (isAutoLoading || !loadMoreBtn || loadMoreBtn.style.display === 'none') {
            return;
        }
        
        const rect = loadMoreBtn.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
            isAutoLoading = true;
            loadNextPage();
            
            // 设置延迟，避免频繁加载
            setTimeout(() => {
                isAutoLoading = false;
            }, 2000);
        }
    }
    
    // 无限滚动已启用
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkAutoLoad, 200);
    });
    
    // 添加键盘快捷键支持（可选）
    document.addEventListener('keydown', function(e) {
        // 按空格键加载更多（仅在页面底部时）
        if (e.code === 'Space' && 
            window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 100) {
            e.preventDefault();
            if (loadMoreBtn && !loadMoreBtn.disabled) {
                loadNextPage();
            }
        }
    });
    
    // 侧边栏功能
    function initSidebar() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        console.log('初始化侧边栏'); // 调试日志
        
        const yearButtons = sidebar.querySelectorAll('.year-btn');
        const monthButtons = sidebar.querySelectorAll('.month-btn');

        // 年份筛选和展开/折叠功能
        yearButtons.forEach((btn, index) => {
            const year = btn.dataset.year;
            const expandIcon = btn.querySelector('.expand-icon');

            // 为展开图标添加单独的点击事件
            if (expandIcon) {
                expandIcon.addEventListener('click', function(e) {
                    e.stopPropagation(); // 阻止事件冒泡到年份按钮
                    const monthList = sidebar.querySelector(`.month-list[data-year="${year}"]`);
                    const isExpanded = btn.classList.toggle('expanded');
                    monthList.style.display = isExpanded ? 'block' : 'none';
                });
            }

            // 为整个年份按钮添加筛选功能
            btn.addEventListener('click', async function() {
                console.log(`点击年份按钮进行筛选 - Year: "${year}"`);
                
                // 检查数据是否可用
                const data = await loadPostsData();
                if (!data) {
                    console.log('数据加载失败，跳过筛选');
                    return;
                }
                
                // 更新活跃状态
                yearButtons.forEach(b => b.classList.remove('active'));
                monthButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                // 加载该年份的文章
                loadPostsByYear(year);
            });
        });
        
        // 月份筛选功能
        monthButtons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // 防止冒泡到年份按钮
                const year = this.dataset.year;
                const month = this.dataset.month;
                
                console.log(`点击月份按钮 - Year: "${year}", Month: "${month}"`);
                
                // 更新活跃状态
                yearButtons.forEach(b => b.classList.remove('active'));
                monthButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 激活父年份按钮
                const parentYearBtn = this.closest('.year-group').querySelector('.year-btn');
                if (parentYearBtn) {
                    parentYearBtn.classList.add('active');
                }
                
                loadPostsByYearMonth(year, month);
            });
        });
        
        // 重置按钮（显示最新文章）
        const allPostsBtn = document.createElement('button');
        allPostsBtn.className = 'year-btn';
        allPostsBtn.innerHTML = '<span class="year-text">全部</span>';
        allPostsBtn.addEventListener('click', function() {
            console.log('显示最新文章'); // 调试日志
            
            // 清除所有活跃状态
            monthButtons.forEach(b => b.classList.remove('active'));
            yearButtons.forEach(b => b.classList.remove('active'));
            
            // 重新加载首页内容
            restoreOriginalPosts();
        });
        
        const yearFilter = sidebar.querySelector('#year-filter');
        if (yearFilter) {
            yearFilter.insertBefore(allPostsBtn, yearFilter.firstChild);
        }
    }
    
    // 全局变量
    let allPostsData = null;
    let originalPostsHTML = null;
    
    // 缓存原始内容
    function cacheOriginalPosts() {
        const socialFeed = document.getElementById('social-feed');
        const loadMoreContainer = document.getElementById('load-more-container');
        if (socialFeed) {
            originalPostsHTML = {
                feedContent: socialFeed.innerHTML,
                loadMoreContent: loadMoreContainer ? loadMoreContainer.outerHTML : null
            };
        }
    }
    
    // 加载JSON数据
    async function loadPostsData() {
        if (allPostsData) return allPostsData;
        
        try {
            console.log('加载文章数据...'); // 调试日志
            
            // 构建完整URL，兼容本地开发和生产环境
            const baseUrl = window.location.origin;
            const jsonUrl = `${baseUrl}/index.json`;
            
            console.log(`请求URL: ${jsonUrl}`); // 调试信息
            
            const response = await fetch(jsonUrl, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                // 本地开发环境的兼容设置
                mode: 'cors',
                cache: 'default'
            });
            
            if (!response.ok) {
                throw new Error(`HTTP错误: ${response.status} - ${response.statusText}`);
            }
            
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                console.warn('响应可能不是JSON格式:', contentType);
            }
            
            allPostsData = await response.json();
            console.log(`✅ 成功加载 ${allPostsData.posts.length} 篇文章数据`); // 调试日志
            return allPostsData;
        } catch (error) {
            console.error('❌ 加载文章数据失败:', error);
            console.log('尝试显示错误提示给用户...');
            
            // 显示用户友好的错误信息
            showSearchError(error.message);
            return null;
        }
    }
    
    // 显示搜索错误提示
    function showSearchError(errorMessage) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'search-error';
            errorDiv.innerHTML = `
                <div style="
                    background: var(--code-bg, #f5f5f5);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    padding: 12px;
                    margin: 10px 0;
                    font-size: 14px;
                    color: var(--secondary);
                ">
                    <strong>⚠️ 搜索功能暂不可用</strong><br>
                    <small>本地开发环境限制，部署后可正常使用</small>
                </div>
            `;
            sidebar.appendChild(errorDiv);
        }
    }

    // 按年份加载文章
    async function loadPostsByYear(year) {
        const data = await loadPostsData();
        if (!data) {
            console.error('无法加载文章数据');
            return;
        }
        
        console.log(`筛选 ${year} 年的文章`); // 调试日志
        
        // 筛选指定年份的文章
        const filteredPosts = data.posts.filter(post => post.year === year);
        
        console.log(`找到 ${filteredPosts.length} 篇文章`); // 调试日志
        
        // 渲染筛选后的文章
        renderPosts(filteredPosts, `${year}年`);
        
        // 隐藏加载更多按钮
        const loadMoreContainer = document.getElementById('load-more-container');
        if (loadMoreContainer) {
            loadMoreContainer.style.display = 'none';
        }
    }
    
    // 按年月加载文章
    async function loadPostsByYearMonth(year, month) {
        const data = await loadPostsData();
        if (!data) {
            console.error('无法加载文章数据');
            return;
        }
        
        console.log(`筛选 ${year}-${month} 的文章`); // 调试日志
        
        // 筛选指定年月的文章
        const filteredPosts = data.posts.filter(post => 
            post.year === year && post.month === month
        );
        
        console.log(`找到 ${filteredPosts.length} 篇文章`); // 调试日志
        
        // 渲染筛选后的文章
        renderPosts(filteredPosts, `${year}年${parseInt(month)}月`);
        
        // 隐藏加载更多按钮
        const loadMoreContainer = document.getElementById('load-more-container');
        if (loadMoreContainer) {
            loadMoreContainer.style.display = 'none';
        }
    }
    
    // 渲染文章列表
    function renderPosts(posts, titleText = null) {
        const socialFeed = document.getElementById('social-feed');
        if (!socialFeed) return;

        // 1. 添加class触发淡出
        socialFeed.classList.add('is-filtering');

        // 2. 等待动画结束后更新内容
        setTimeout(() => {
            // 如果没有找到文章
            if (posts.length === 0) {
                socialFeed.innerHTML = `
                    <div class="no-results">
                        <div class="no-results-content">
                            <h3>😔 没有找到文章</h3>
                            <p>${titleText}没有发布的文章</p>
                        </div>
                    </div>
                `;
            } else {
                // 生成文章HTML
                let postsHTML = '';
                posts.forEach((post, index) => {
                    const isFirst = index === 0;
                    const isLast = index === posts.length - 1;
                    let borderClass = '';
                    if (isFirst && isLast) {
                        borderClass = 'style="border-radius: 12px;"';
                    } else if (isFirst) {
                        borderClass = 'style="border-radius: 12px 12px 0 0;"';
                    } else if (isLast) {
                        borderClass = 'style="border-radius: 0 0 12px 12px;"';
                    }
                    
                    // 生成缩略图HTML（如果有第一张图片）
                    const thumbnailHTML = post.firstImage ? 
                        `<div class="feed-thumbnail">
                            <img src="${post.firstImage}" alt="缩略图" loading="lazy">
                        </div>` : '';
                    
                    postsHTML += `
                        <article class="feed-entry home-feed" ${borderClass}>
                            <div class="feed-entry-content">
                                ${thumbnailHTML}
                                <div class="feed-content">
                                    <p>${post.summary}</p>
                                </div>
                            </div>
                            <footer class="feed-footer">
                                <span>${post.dateFormatted}</span>
                            </footer>
                            <a class="feed-link" aria-label="查看完整内容" href="${post.url}"></a>
                        </article>
                    `;
                });
                socialFeed.innerHTML = postsHTML;
            }
            
            // 重新添加点击事件处理
            addFeedEntryClickHandlers();
            
            // 3. 移除class触发淡入
            socialFeed.classList.remove('is-filtering');

            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200); // 延迟时间应与CSS中的transition持续时间匹配
    }
    
    // 恢复原始文章
    function restoreOriginalPosts() {
        if (!originalPostsHTML) return;
        
        console.log('恢复原始文章'); // 调试日志
        
        const socialFeed = document.getElementById('social-feed');
        if (!socialFeed) return;

        // 添加淡出效果
        socialFeed.classList.add('is-filtering');

        setTimeout(() => {
            if (originalPostsHTML.feedContent) {
                socialFeed.innerHTML = originalPostsHTML.feedContent;
            }
            
            // 恢复加载更多按钮
            if (originalPostsHTML.loadMoreContent) {
                let loadMoreContainer = document.getElementById('load-more-container');
                if (!loadMoreContainer && socialFeed.parentNode) {
                    socialFeed.parentNode.insertAdjacentHTML('afterend', originalPostsHTML.loadMoreContent);
                    // 重新绑定加载更多事件
                    const newLoadMoreBtn = document.getElementById('load-more-btn');
                    if (newLoadMoreBtn) {
                        newLoadMoreBtn.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            loadNextPage();
                        });
                    }
                } else if (loadMoreContainer) {
                    loadMoreContainer.style.display = 'block';
                }
            }
            
            // 重新添加点击事件处理
            addFeedEntryClickHandlers();

            // 移除淡出，触发淡入
            socialFeed.classList.remove('is-filtering');
            
            // 滚动到顶部
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 200);
    }
    
    // 在页面加载时缓存原始内容
    cacheOriginalPosts();

    // 必须在 cacheOriginalPosts 之后：「全部」按钮要恢复的是首页原始内容，不是上次滚动到的位置
    restoreFeedState();
});