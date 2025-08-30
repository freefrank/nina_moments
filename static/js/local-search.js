// 本地搜索功能 - 兼容本地开发环境
(function() {
    'use strict';
    
    // 检查是否在搜索页面
    if (!document.getElementById('searchInput')) {
        return;
    }
    
    console.log('🔍 LOCAL-SEARCH.JS 正在初始化本地搜索功能...');
    console.log('🔍 这是我们自定义的local-search.js脚本！');
    
    let fuse; // 搜索引擎
    let searchData = null;
    const resList = document.getElementById('searchResults');
    const sInput = document.getElementById('searchInput');
    let first, last, current_elem = null;
    let resultsAvailable = false;
    
    // Fuse.js配置 - 从hugo.yaml中读取
    const fuseOptions = {
        isCaseSensitive: false,
        shouldSort: true,
        location: 0,
        distance: 1000,
        threshold: 0.4,
        minMatchCharLength: 1,
        keys: ["title", "permalink", "summary", "content"]
    };
    
    // 动态加载Fuse.js
    function loadFuseJS() {
        return new Promise((resolve, reject) => {
            if (window.Fuse) {
                console.log('✅ Fuse.js已存在');
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js';
            script.onload = () => {
                console.log('✅ Fuse.js加载成功');
                resolve();
            };
            script.onerror = () => {
                console.error('❌ Fuse.js加载失败');
                reject(new Error('无法加载Fuse.js'));
            };
            document.head.appendChild(script);
        });
    }
    
    // 加载搜索数据
    async function loadSearchData() {
        if (searchData) return searchData;
        
        // 尝试多个可能的JSON路径
        const possiblePaths = [
            '/index.json',
            '../index.json',
            './index.json',
            window.location.origin + '/index.json'
        ];
        
        for (const path of possiblePaths) {
            try {
                console.log(`🔄 尝试加载搜索数据: ${path}`);
                
                const response = await fetch(path, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    mode: 'cors',
                    cache: 'default'
                });
                
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.posts && Array.isArray(data.posts)) {
                        console.log(`✅ 成功加载 ${data.posts.length} 条搜索数据`);
                        searchData = data.posts;
                        return searchData;
                    }
                }
            } catch (error) {
                console.warn(`⚠️ 路径 ${path} 加载失败:`, error.message);
            }
        }
        
        throw new Error('所有路径都无法加载搜索数据');
    }
    
    // 初始化搜索
    async function initSearch() {
        try {
            // 显示加载状态
            showLoadingState();
            
            // 并行加载Fuse.js和搜索数据
            await Promise.all([
                loadFuseJS(),
                loadSearchData()
            ]);
            
            // 初始化Fuse搜索引擎
            fuse = new Fuse(searchData, fuseOptions);
            
            // 隐藏加载状态，显示搜索框
            hideLoadingState();
            setupSearchEvents();
            
            console.log('🎉 搜索功能初始化完成');
            
        } catch (error) {
            console.error('❌ 搜索初始化失败:', error);
            showErrorState(error.message);
        }
    }
    
    // 显示加载状态
    function showLoadingState() {
        if (resList) {
            resList.innerHTML = `
                <li style="
                    padding: 20px;
                    text-align: center;
                    color: var(--secondary);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    margin: 10px 0;
                ">
                    <div>🔄 正在初始化搜索功能...</div>
                    <small style="margin-top: 8px; display: block;">首次加载需要一些时间</small>
                </li>
            `;
        }
        if (sInput) {
            sInput.disabled = true;
            sInput.placeholder = '正在加载搜索功能...';
        }
    }
    
    // 隐藏加载状态
    function hideLoadingState() {
        if (resList) {
            resList.innerHTML = '';
        }
        if (sInput) {
            sInput.disabled = false;
            sInput.placeholder = '搜索文章内容... ↵';
            sInput.focus();
        }
    }
    
    // 显示错误状态
    function showErrorState(errorMessage) {
        if (resList) {
            resList.innerHTML = `
                <li style="
                    padding: 20px;
                    text-align: center;
                    color: var(--secondary);
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    margin: 10px 0;
                    background: var(--code-bg);
                ">
                    <div>⚠️ 搜索功能暂不可用</div>
                    <small style="margin-top: 8px; display: block; color: var(--tertiary);">
                        ${errorMessage}<br>
                        本地环境限制，请在部署后使用搜索功能
                    </small>
                </li>
            `;
        }
        if (sInput) {
            sInput.disabled = true;
            sInput.placeholder = '搜索功能不可用（本地环境限制）';
        }
    }
    
    // 设置搜索事件
    function setupSearchEvents() {
        if (!sInput || !resList) return;
        
        // 防止搜索框所在表单提交
        const searchForm = sInput.closest('form');
        const searchBox = document.getElementById('searchbox');
        
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
        
        if (searchBox) {
            searchBox.addEventListener('submit', function(e) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            });
        }
        
        // 实时搜索 - 使用防抖避免过于频繁的搜索
        let searchTimeout;
        sInput.addEventListener('input', function(e) {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (!query || !fuse) {
                clearResults();
                return;
            }
            
            if (query.length < 2) {
                resList.innerHTML = `
                    <div style="padding: 15px; color: var(--secondary); text-align: center;">
                        请输入至少2个字符进行搜索
                    </div>
                `;
                return;
            }
            
            // 防抖搜索，300ms后执行
            searchTimeout = setTimeout(() => {
                const results = fuse.search(query, { limit: 10 });
                displayResults(results, query);
            }, 300);
        });
        
        // 防止各种可能导致页面刷新的事件
        sInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                const focusedItem = document.querySelector('.search-result-card.focus');
                if (focusedItem) {
                    // 有选中项，正常处理
                    return;
                } else {
                    // 没有选中项，阻止默认行为
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            }
        });
        
        sInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
        
        // 清空搜索
        sInput.addEventListener('search', function(e) {
            if (!this.value) {
                clearResults();
            }
        });
        
        // 键盘导航
        setupKeyboardNavigation();
    }
    
    // 提取第一张图片URL
    function extractFirstImage(content) {
        if (!content) return null;
        
        // 匹配 ![Media 1](图片路径) 格式
        const imageRegex = /!\[Media 1\]\(([^)]+)\)/;
        const match = content.match(imageRegex);
        return match ? match[1] : null;
    }
    
    // 清理内容，移除图片标记
    function cleanContent(content) {
        if (!content) return '';
        
        // 移除所有图片标记
        let cleanedContent = content.replace(/!\[Media \d+\]\([^)]+\)/g, '');
        
        // 清理多余空行
        cleanedContent = cleanedContent.replace(/\n\n+/g, '\n\n');
        cleanedContent = cleanedContent.trim();
        
        return cleanedContent;
    }
    
    // 显示搜索结果
    function displayResults(results, query) {
        if (!results || results.length === 0) {
            resList.innerHTML = `
                <div class="no-results">
                    <div class="no-results-content">
                        <h3>📭 没有找到相关内容</h3>
                        <p>搜索词: "${query}"</p>
                        <small>尝试使用其他关键词</small>
                    </div>
                </div>
            `;
            resultsAvailable = false;
            return;
        }
        
        let resultHTML = '';
        results.forEach((result, index) => {
            const item = result.item;
            // 修复NaN%问题 - 检查score是否存在并是有效数值
            const rawScore = result.score;
            let score;
            if (typeof rawScore === 'number' && !isNaN(rawScore)) {
                score = Math.round((1 - rawScore) * 100);
            } else {
                score = 95; // 默认高匹配度
            }
            
            // 提取第一张图片
            const firstImage = item.firstImage || extractFirstImage(item.content);
            
            // 清理并高亮内容
            let cleanedContent = cleanContent(item.content || item.summary || '');
            let highlightedContent = cleanedContent;
            
            // 关键词高亮
            const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
            highlightedContent = highlightedContent.replace(regex, '<mark>$1</mark>');
            
            // 截断内容到300字符
            if (highlightedContent.length > 300) {
                highlightedContent = highlightedContent.substring(0, 300) + '...';
            }
            
            // 格式化日期
            const dateObj = new Date(item.date);
            const formattedDate = dateObj.toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            // 生成缩略图HTML
            const thumbnailHTML = firstImage ? 
                `<div class="search-result-thumbnail">
                    <img src="${firstImage}" alt="缩略图" loading="lazy">
                </div>` : '';
            
            resultHTML += `
                <div class="search-result-card" data-index="${index}">
                    <div class="search-result-content">
                        ${thumbnailHTML}
                        <div class="search-result-text">
                            <div class="search-result-body">${highlightedContent || '暂无内容预览'}</div>
                            <div class="search-result-footer">
                                <span class="search-result-date">${formattedDate}</span>
                            </div>
                        </div>
                    </div>
                    <a href="${item.url || item.permalink}" aria-label="查看完整内容" class="search-result-link"></a>
                </div>
            `;
        });
        
        // 添加搜索结果样式
        if (!document.getElementById('search-result-styles')) {
            const styles = document.createElement('style');
            styles.id = 'search-result-styles';
            styles.textContent = `
                /* 搜索结果卡片样式 - 仿照主页信息流 */
                .search-result-card {
                    background: var(--entry);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    margin-bottom: 12px;
                    padding: 16px;
                    transition: all 0.2s ease;
                    position: relative;
                    cursor: pointer;
                }
                
                .search-result-card:hover,
                .search-result-card.focus {
                    background: var(--hljs-bg);
                    border-color: var(--theme);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
                }
                
                .search-result-content {
                    display: flex;
                    gap: 12px;
                    align-items: flex-start;
                }
                
                .search-result-thumbnail {
                    flex-shrink: 0;
                    width: 80px;
                    height: 80px;
                    border-radius: 8px;
                    overflow: hidden;
                    background: var(--hljs-bg);
                    border: 1px solid var(--border);
                }
                
                .search-result-thumbnail img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.2s ease;
                }
                
                .search-result-card:hover .search-result-thumbnail img {
                    transform: scale(1.05);
                }
                
                .search-result-text {
                    flex: 1;
                    min-width: 0;
                }
                
                .search-result-body {
                    font-size: 16px;
                    line-height: 1.6;
                    color: var(--content);
                    margin-bottom: 12px;
                    word-wrap: break-word;
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .search-result-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-top: 8px;
                    border-top: 1px solid var(--border);
                    font-size: 14px;
                }
                
                .search-result-date {
                    color: var(--secondary);
                    opacity: 0.8;
                }
                
                .search-result-score {
                    background: #2196f3;
                    color: #ffffff;
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: 500;
                    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
                }
                
                /* 暗色模式下的相关性标签 */
                .dark .search-result-score,
                [data-theme="dark"] .search-result-score {
                    background: #1976d2;
                    color: #ffffff;
                }
                
                .search-result-link {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 1;
                }
                
                mark {
                    background: #ffeb3b;
                    color: #1a1a1a;
                    padding: 2px 4px;
                    border-radius: 3px;
                    font-weight: 600;
                    box-shadow: 0 1px 2px rgba(0,0,0,0.1);
                }
                
                /* 暗色模式下的高亮样式 */
                .dark mark,
                [data-theme="dark"] mark {
                    background: #ffc107;
                    color: #000;
                    font-weight: 700;
                }
                
                .no-results {
                    background: var(--entry);
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    padding: 40px 20px;
                    text-align: center;
                    margin: 20px 0;
                }
                
                .no-results h3 {
                    margin: 0 0 12px 0;
                    font-size: 20px;
                    color: var(--content);
                }
                
                .no-results p {
                    margin: 0 0 8px 0;
                    color: var(--secondary);
                }
                
                .no-results small {
                    color: var(--tertiary);
                }
                
                /* 移动端优化 */
                @media (max-width: 768px) {
                    .search-result-card {
                        padding: 12px;
                        margin-bottom: 8px;
                    }
                    
                    .search-result-content {
                        gap: 10px;
                    }
                    
                    .search-result-thumbnail {
                        width: 60px;
                        height: 60px;
                    }
                    
                    .search-result-body {
                        font-size: 15px;
                        -webkit-line-clamp: 3;
                    }
                    
                    .search-result-footer {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 6px;
                    }
                }
                
                /* 暗色模式优化 */
                .dark .search-result-card:hover {
                    background: #1a1a1a;
                }
                
                .dark .search-result-thumbnail {
                    background: #2a2a2a;
                }
            `;
            document.head.appendChild(styles);
        }
        
        resList.innerHTML = resultHTML;
        resultsAvailable = true;
        first = resList.firstChild;
        last = resList.lastChild;
    }
    
    // 清空搜索结果
    function clearResults() {
        if (resList) {
            resList.innerHTML = '';
        }
        resultsAvailable = false;
        first = last = current_elem = null;
    }
    
    // 键盘导航
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', function(e) {
            const key = e.key;
            const ae = document.activeElement;
            const inbox = document.getElementById('searchbox') && document.getElementById('searchbox').contains(ae);
            
            if (key === 'Escape') {
                clearResults();
                sInput.value = '';
                sInput.focus();
                return;
            }
            
            if (!resultsAvailable || !inbox) return;
            
            if (key === 'ArrowDown') {
                e.preventDefault();
                navigateResults('down');
            } else if (key === 'ArrowUp') {
                e.preventDefault();
                navigateResults('up');
            } else if (key === 'Enter') {
                e.preventDefault();
                const focusedItem = document.querySelector('.search-result-card.focus');
                if (focusedItem) {
                    const link = focusedItem.querySelector('.search-result-link');
                    if (link) link.click();
                }
            }
        });
    }
    
    // 导航搜索结果
    function navigateResults(direction) {
        const items = document.querySelectorAll('.search-result-card');
        const focusedItem = document.querySelector('.search-result-card.focus');
        
        // 清除所有焦点
        items.forEach(item => item.classList.remove('focus'));
        
        if (!focusedItem) {
            // 如果没有焦点项，选择第一个
            if (items[0]) {
                items[0].classList.add('focus');
                items[0].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
            return;
        }
        
        const currentIndex = Array.from(items).indexOf(focusedItem);
        let nextIndex;
        
        if (direction === 'down') {
            nextIndex = currentIndex + 1;
            if (nextIndex >= items.length) nextIndex = 0;
        } else {
            nextIndex = currentIndex - 1;
            if (nextIndex < 0) nextIndex = items.length - 1;
        }
        
        if (items[nextIndex]) {
            items[nextIndex].classList.add('focus');
            items[nextIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }
    
    // 禁用可能存在的原生搜索功能
    function disableNativeSearch() {
        // 移除可能存在的PaperMod搜索脚本
        const existingScripts = document.querySelectorAll('script[src*="fastsearch"], script[src*="search"]');
        existingScripts.forEach(script => {
            if (script.src.includes('fastsearch') || script.src.includes('search')) {
                console.log('禁用原生搜索脚本:', script.src);
                script.remove();
            }
        });
        
        // 清除可能存在的全局搜索变量
        if (window.fuse) {
            delete window.fuse;
        }
        
        // 阻止原生搜索事件
        document.addEventListener('keydown', function(e) {
            if (e.target === sInput && e.key === 'Enter') {
                const focusedItem = document.querySelector('.search-result-card.focus');
                if (!focusedItem) {
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    return false;
                }
            }
        }, true); // 使用捕获阶段
    }
    
    // 页面加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            disableNativeSearch();
            setTimeout(initSearch, 100); // 延迟一点确保DOM完全就绪
        });
    } else {
        disableNativeSearch();
        setTimeout(initSearch, 100);
    }
    
})();