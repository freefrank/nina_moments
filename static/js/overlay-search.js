// 全局搜索弹窗功能
(function() {
    let searchOverlay = null;
    let searchInput = null;
    let searchResults = null;
    let postsData = [];
    let fuse = null;
    let currentFocus = -1;
    
    // 创建搜索弹窗
    function createSearchOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'search-overlay';
        overlay.innerHTML = `
            <div class="search-modal">
                <div class="search-header">
                    <input type="text" id="search-input" placeholder="搜索内容..." autocomplete="off">
                    <button id="search-close" aria-label="关闭搜索">✕</button>
                </div>
                <div class="search-results-container">
                    <div id="search-results"></div>
                    <div id="search-loading" class="search-loading" style="display: none;">
                        <div class="loading-spinner"></div>
                        <span>搜索中...</span>
                    </div>
                </div>
            </div>
        `;
        
        // 添加样式
        const style = document.createElement('style');
        style.textContent = `
            #search-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(5px);
                z-index: 9999;
                display: none;
                align-items: flex-start;
                justify-content: center;
                padding-top: 10vh;
            }
            
            #search-overlay.show {
                display: flex;
                animation: fadeIn 0.2s ease-out;
            }
            
            .search-modal {
                background: var(--entry);
                border: 1px solid var(--border);
                border-radius: 12px;
                width: 90%;
                max-width: 600px;
                max-height: 70vh;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                animation: slideDown 0.2s ease-out;
                display: flex;
                flex-direction: column;
            }
            
            .search-header {
                padding: 20px;
                border-bottom: 1px solid var(--border);
                display: flex;
                gap: 12px;
                align-items: center;
            }
            
            #search-input {
                flex: 1;
                background: var(--theme);
                border: 1px solid var(--border);
                border-radius: 8px;
                padding: 12px 16px;
                font-size: 16px;
                color: var(--content);
                outline: none;
                transition: border-color 0.2s ease;
            }
            
            #search-input:focus {
                border-color: var(--content);
            }
            
            #search-close {
                background: transparent;
                border: none;
                font-size: 18px;
                color: var(--content);
                cursor: pointer;
                padding: 8px;
                border-radius: 6px;
                transition: background 0.2s ease;
            }
            
            #search-close:hover {
                background: var(--hljs-bg);
            }
            
            .search-results-container {
                flex: 1;
                overflow-y: auto;
                max-height: calc(70vh - 80px);
            }
            
            #search-results {
                padding: 0;
            }
            
            .search-result-item {
                padding: 16px 20px;
                border-bottom: 1px solid var(--border);
                cursor: pointer;
                transition: background 0.2s ease;
                display: flex;
                gap: 12px;
            }
            
            .search-result-item:hover,
            .search-result-item.focused {
                background: var(--hljs-bg);
                border-color: var(--theme);
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0,0,0,0.1);
            }
            
            .search-result-item:last-child {
                border-bottom: none;
            }
            
            .search-result-thumbnail {
                flex-shrink: 0;
                width: 60px;
                height: 60px;
                border-radius: 6px;
                overflow: hidden;
                background: var(--hljs-bg);
            }
            
            .search-result-thumbnail img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .search-result-content {
                flex: 1;
                min-width: 0;
            }
            
            .search-result-content h3 {
                margin: 0 0 8px 0;
                font-size: 14px;
                color: var(--content);
                opacity: 0.7;
                font-weight: normal;
            }
            
            .search-result-content p {
                margin: 0;
                font-size: 14px;
                line-height: 1.4;
                color: var(--content);
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
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
            
            .search-highlight {
                background: #ffeb3b;
                color: #000;
                padding: 0 2px;
                border-radius: 2px;
            }
            
            .dark .search-highlight {
                background: #ff9800;
                color: #fff;
            }
            
            .search-loading {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                gap: 12px;
                color: var(--content);
                opacity: 0.7;
            }
            
            .loading-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid var(--border);
                border-top: 2px solid var(--content);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            .no-results {
                text-align: center;
                padding: 40px 20px;
                color: var(--content);
                opacity: 0.7;
            }
            
            .no-results h3 {
                margin: 0 0 12px 0;
                font-size: 18px;
                color: var(--content);
            }
            
            .no-results p {
                margin: 0 0 8px 0;
                color: var(--secondary);
            }
            
            .no-results small {
                color: var(--tertiary);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            /* 移动端适配 */
            @media (max-width: 768px) {
                #search-overlay {
                    padding-top: 5vh;
                }
                
                .search-modal {
                    width: 95%;
                    max-height: 80vh;
                }
                
                .search-header {
                    padding: 16px;
                }
                
                #search-input {
                    font-size: 16px; /* 防止iOS缩放 */
                }
                
                .search-result-item {
                    padding: 12px 16px;
                }
                
                .search-result-thumbnail {
                    width: 50px;
                    height: 50px;
                }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(overlay);
        
        searchOverlay = overlay;
        searchInput = document.getElementById('search-input');
        searchResults = document.getElementById('search-results');
        
        // 绑定事件
        bindEvents();
    }
    
    // 绑定事件
    function bindEvents() {
        // 关闭按钮
        document.getElementById('search-close').addEventListener('click', closeSearch);
        
        // 点击背景关闭
        searchOverlay.addEventListener('click', function(e) {
            if (e.target === searchOverlay) {
                closeSearch();
            }
        });
        
        // 搜索输入
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            const query = this.value.trim();
            
            if (query.length === 0) {
                searchResults.innerHTML = '';
                currentFocus = -1;
                return;
            }
            
            if (query.length < 2) {
                searchResults.innerHTML = '<div class="no-results">请输入至少2个字符</div>';
                return;
            }
            
            // 显示加载中
            document.getElementById('search-loading').style.display = 'flex';
            searchResults.innerHTML = '';
            
            // 延迟搜索
            searchTimeout = setTimeout(() => {
                performSearch(query);
            }, 300);
        });
        
        // 键盘导航
        searchInput.addEventListener('keydown', function(e) {
            const items = searchResults.querySelectorAll('.search-result-item');
            
            switch(e.key) {
                case 'Escape':
                    e.preventDefault();
                    closeSearch();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    currentFocus = Math.min(currentFocus + 1, items.length - 1);
                    updateFocus(items);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    currentFocus = Math.max(currentFocus - 1, -1);
                    updateFocus(items);
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (currentFocus >= 0 && items[currentFocus]) {
                        items[currentFocus].click();
                    }
                    break;
            }
        });
    }
    
    // 更新焦点
    function updateFocus(items) {
        items.forEach((item, index) => {
            item.classList.toggle('focused', index === currentFocus);
        });
        
        // 滚动到可见区域
        if (currentFocus >= 0 && items[currentFocus]) {
            items[currentFocus].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    }
    
    // 执行搜索
    function performSearch(query) {
        if (!fuse || postsData.length === 0) {
            loadSearchData().then(() => performSearch(query));
            return;
        }
        
        const results = fuse.search(query, { limit: 50 });
        document.getElementById('search-loading').style.display = 'none';
        
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">没有找到相关内容</div>';
            currentFocus = -1;
            return;
        }
        
        displayResults(results, query);
    }
    
    // 显示搜索结果 - 复用local-search.js的成功逻辑
    function displayResults(results, query) {
        if (!results || results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <h3>📭 没有找到相关内容</h3>
                    <p>搜索词: "${query}"</p>
                    <small>尝试使用其他关键词</small>
                </div>
            `;
            currentFocus = -1;
            return;
        }
        
        let resultHTML = '';
        results.forEach((result, index) => {
            const item = result.item;
            
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
                <div class="search-result-item" data-url="${item.url || item.permalink}" data-index="${index}">
                    <div class="search-result-content">
                        ${thumbnailHTML}
                        <div class="search-result-text">
                            <div class="search-result-body">${highlightedContent || '暂无内容预览'}</div>
                            <div class="search-result-footer">
                                <span class="search-result-date">${formattedDate}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        searchResults.innerHTML = resultHTML;
        currentFocus = -1;
        
        // 绑定点击事件
        searchResults.querySelectorAll('.search-result-item').forEach(item => {
            item.addEventListener('click', function() {
                const url = this.dataset.url;
                if (url) {
                    closeSearch();
                    window.location.href = url;
                }
            });
        });
    }
    
    // 提取第一张图片URL - 复用local-search.js的逻辑
    function extractFirstImage(content) {
        if (!content) return null;
        
        // 匹配 ![Media 1](图片路径) 格式
        const imageRegex = /!\[Media 1\]\(([^)]+)\)/;
        const match = content.match(imageRegex);
        return match ? match[1] : null;
    }
    
    // 清理内容，移除图片标记 - 复用local-search.js的逻辑
    function cleanContent(content) {
        if (!content) return '';
        
        // 移除所有图片标记
        let cleanedContent = content.replace(/!\[Media \d+\]\([^)]+\)/g, '');
        
        // 清理多余空行
        cleanedContent = cleanedContent.replace(/\n\n+/g, '\n\n');
        cleanedContent = cleanedContent.trim();
        
        return cleanedContent;
    }
    
    // 更新焦点样式
    function updateFocus(items) {
        items.forEach((item, index) => {
            item.classList.toggle('focused', index === currentFocus);
        });
        
        // 滚动到可见区域
        if (currentFocus >= 0 && items[currentFocus]) {
            items[currentFocus].scrollIntoView({
                block: 'nearest',
                behavior: 'smooth'
            });
        }
    }
    
    // 加载搜索数据 - 复用local-search.js的成功逻辑
    async function loadSearchData() {
        if (postsData.length > 0) return postsData;
        
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
                        postsData = data.posts;
                        
                        // 初始化Fuse搜索
                        await loadFuseJS();
                        fuse = new Fuse(postsData, {
                            isCaseSensitive: false,
                            shouldSort: true,
                            location: 0,
                            distance: 1000,
                            threshold: 0.4,
                            minMatchCharLength: 1,
                            keys: ["title", "permalink", "summary", "content"]
                        });
                        
                        return postsData;
                    }
                }
            } catch (error) {
                console.warn(`⚠️ 路径 ${path} 加载失败:`, error.message);
            }
        }
        
        throw new Error('所有路径都无法加载搜索数据');
    }
    
    // 动态加载Fuse.js
    async function loadFuseJS() {
        if (window.Fuse) {
            console.log('✅ Fuse.js已存在');
            return;
        }
        
        return new Promise((resolve, reject) => {
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
    
    // 动态加载脚本
    function loadScript(src) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${src}"]`)) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    // 打开搜索
    function openSearch() {
        if (!searchOverlay) {
            createSearchOverlay();
        }
        
        searchOverlay.classList.add('show');
        searchInput.focus();
        searchInput.value = '';
        searchResults.innerHTML = '';
        currentFocus = -1;
        document.body.style.overflow = 'hidden';
    }
    
    // 关闭搜索
    function closeSearch() {
        if (searchOverlay) {
            searchOverlay.classList.remove('show');
            document.body.style.overflow = '';
        }
    }
    
    // 全局快捷键监听
    document.addEventListener('keydown', function(e) {
        // 按/键打开搜索
        if (e.key === '/' && !isInputFocused()) {
            e.preventDefault();
            openSearch();
        }
        
        // 按Escape关闭搜索
        if (e.key === 'Escape' && searchOverlay && searchOverlay.classList.contains('show')) {
            e.preventDefault();
            closeSearch();
        }
    });
    
    // 检查是否在输入框中
    function isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA' ||
            activeElement.contentEditable === 'true'
        );
    }
    
    // 拦截搜索链接点击
    document.addEventListener('click', function(e) {
        const searchLink = e.target.closest('a[href*="/search/"]');
        if (searchLink) {
            e.preventDefault();
            openSearch();
        }
    });
    
    // 页面加载完成后预加载搜索数据（可选）
    document.addEventListener('DOMContentLoaded', function() {
        // 延迟5秒后预加载搜索数据
        setTimeout(() => {
            if (!postsData.length) {
                loadSearchData();
            }
        }, 5000);
    });
})();