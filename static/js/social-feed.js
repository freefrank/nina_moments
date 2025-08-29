// Twitter-like Social Feed Dynamic Loading
document.addEventListener('DOMContentLoaded', function() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    const socialFeed = document.getElementById('social-feed');
    const loadMoreContainer = document.getElementById('load-more-container');
    
    if (!loadMoreBtn || !socialFeed) {
        return; // 如果没有相关元素，直接返回
    }
    
    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loadNextPage();
    });
    
    function loadNextPage() {
        const nextUrl = loadMoreBtn.getAttribute('data-next-url');
        if (!nextUrl) {
            return;
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
                }
                
                // 检查是否还有下一页
                const nextLoadMoreBtn = doc.getElementById('load-more-btn');
                if (nextLoadMoreBtn) {
                    const nextNextUrl = nextLoadMoreBtn.getAttribute('data-next-url');
                    if (nextNextUrl) {
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
});