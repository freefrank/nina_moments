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
    
    // 添加feed条目点击事件
    function addFeedEntryClickHandlers() {
        const feedEntries = document.querySelectorAll('.feed-entry');
        feedEntries.forEach(entry => {
            if (!entry.classList.contains('clickable')) {
                entry.classList.add('clickable');
                entry.addEventListener('click', function(e) {
                    // 如果点击的是按钮或链接，不处理
                    if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || 
                        e.target.closest('button') || e.target.closest('a')) {
                        return;
                    }
                    
                    const feedLink = entry.querySelector('.feed-link');
                    if (feedLink) {
                        console.log(`点击文章，跳转到: ${feedLink.href}`); // 调试日志
                        window.location.href = feedLink.href;
                    } else {
                        console.log('未找到 .feed-link 元素'); // 调试日志
                    }
                });
            }
        });
        
        // 清理作者信息
        removeAuthorInfo();
    }
    
    // 初始化现有条目的点击处理
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
    
    function loadNextPage() {
        let nextUrl = loadMoreBtn.getAttribute('data-next-url');
        if (!nextUrl) {
            return;
        }
        
        // 确保URL使用HTTPS协议，避免混合内容错误
        if (window.location.protocol === 'https:' && nextUrl.startsWith('http:')) {
            nextUrl = nextUrl.replace('http:', 'https:');
        }
        
        // 设置加载状态
        loadMoreBtn.disabled = true;
        loadMoreBtn.classList.add('loading');
        loadMoreBtn.textContent = '加载中';
        
        // 发送请求获取下一页
        fetch(nextUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('网络请求失败');
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
                    let nextNextUrl = nextLoadMoreBtn.getAttribute('data-next-url');
                    if (nextNextUrl) {
                        // 确保URL使用HTTPS协议
                        if (window.location.protocol === 'https:' && nextNextUrl.startsWith('http:')) {
                            nextNextUrl = nextNextUrl.replace('http:', 'https:');
                        }
                        loadMoreBtn.setAttribute('data-next-url', nextNextUrl);
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
    
    // 可以取消注释下面的代码来启用无限滚动
    /*
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(checkAutoLoad, 200);
    });
    */
    
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
        
        // 年份展开/折叠功能
        const yearButtons = sidebar.querySelectorAll('.year-btn');
        console.log(`找到 ${yearButtons.length} 个年份按钮`); // 调试日志
        
        yearButtons.forEach((btn, index) => {
            const year = btn.dataset.year;
            console.log(`年份按钮 ${index}: ${year}`); // 调试日志
            btn.addEventListener('click', function() {
                const year = this.dataset.year;
                const monthList = sidebar.querySelector(`.month-list[data-year="${year}"]`);
                const isExpanded = this.classList.contains('expanded');
                
                if (isExpanded) {
                    // 折叠
                    this.classList.remove('expanded');
                    monthList.style.display = 'none';
                } else {
                    // 展开
                    this.classList.add('expanded');
                    monthList.style.display = 'block';
                }
            });
        });
        
        // 月份筛选功能
        const monthButtons = sidebar.querySelectorAll('.month-btn');
        monthButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const year = this.dataset.year;
                const month = this.dataset.month;
                
                console.log(`点击月份按钮 - Year: "${year}", Month: "${month}"`); // 调试日志
                
                // 更新活跃状态
                monthButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // 动态加载目标月份的文章
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
            const response = await fetch('/index.json');
            if (!response.ok) {
                throw new Error('无法加载文章数据');
            }
            allPostsData = await response.json();
            console.log(`加载了 ${allPostsData.posts.length} 篇文章数据`); // 调试日志
            return allPostsData;
        } catch (error) {
            console.error('加载文章数据失败:', error);
            return null;
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
            return;
        }
        
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
            
            postsHTML += `
                <article class="feed-entry home-feed" ${borderClass}>
                    <div class="feed-content">
                        <p>${post.summary}</p>
                    </div>
                    <footer class="feed-footer">
                        <span>${post.dateFormatted}</span>
                    </footer>
                    <a class="feed-link" aria-label="查看完整内容" href="${post.url}"></a>
                </article>
            `;
        });
        
        socialFeed.innerHTML = postsHTML;
        
        // 重新添加点击事件处理
        addFeedEntryClickHandlers();
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 恢复原始文章
    function restoreOriginalPosts() {
        if (!originalPostsHTML) return;
        
        console.log('恢复原始文章'); // 调试日志
        
        const socialFeed = document.getElementById('social-feed');
        if (socialFeed && originalPostsHTML.feedContent) {
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
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 在页面加载时缓存原始内容
    cacheOriginalPosts();
});