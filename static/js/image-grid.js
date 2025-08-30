// 图片九宫格和预览功能
document.addEventListener('DOMContentLoaded', function() {
    const imageGrid = document.querySelector('.post-images-grid');
    const modal = document.getElementById('image-modal');
    const modalImage = document.querySelector('.modal-image');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');
    const modalCounter = document.querySelector('.modal-counter');
    
    if (!imageGrid || !modal) {
        return;
    }
    
    // 获取所有图片URL
    let allImages = [];
    try {
        const imagesData = imageGrid.getAttribute('data-images');
        allImages = JSON.parse(imagesData) || [];
    } catch (e) {
        console.error('解析图片数据失败:', e);
        return;
    }
    
    let currentIndex = 0;
    
    // 设置网格CSS类名（兼容不支持:has()的浏览器）
    const imageCount = Math.min(allImages.length, 9);
    imageGrid.classList.add(`grid-${imageCount}`);
    
    // 图片点击事件
    function initImageClickEvents() {
        const imageItems = document.querySelectorAll('.post-image-item');
        
        imageItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                currentIndex = index;
                openModal();
            });
            
            // 添加键盘支持
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `查看图片 ${index + 1}`);
            
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    currentIndex = index;
                    openModal();
                }
            });
        });
    }
    
    // 打开弹窗
    function openModal() {
        if (currentIndex >= 0 && currentIndex < allImages.length) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            updateModalImage();
            updateNavButtons();
            updateCounter();
            
            // 焦点管理
            modal.focus();
        }
    }
    
    // 关闭弹窗
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // 恢复焦点到触发的图片
        const imageItems = document.querySelectorAll('.post-image-item');
        if (imageItems[currentIndex]) {
            imageItems[currentIndex].focus();
        }
    }
    
    // 更新弹窗图片
    function updateModalImage() {
        if (currentIndex >= 0 && currentIndex < allImages.length) {
            modalImage.src = allImages[currentIndex];
            modalImage.alt = `图片 ${currentIndex + 1}`;
            
            // 图片加载动画
            modalImage.style.opacity = '0';
            modalImage.style.transform = 'scale(0.9)';
            
            modalImage.onload = function() {
                modalImage.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                modalImage.style.opacity = '1';
                modalImage.style.transform = 'scale(1)';
            };
        }
    }
    
    // 更新导航按钮状态
    function updateNavButtons() {
        modalPrev.disabled = currentIndex <= 0;
        modalNext.disabled = currentIndex >= allImages.length - 1;
    }
    
    // 更新计数器
    function updateCounter() {
        modalCounter.textContent = `${currentIndex + 1} / ${allImages.length}`;
    }
    
    // 上一张图片
    function prevImage() {
        if (currentIndex > 0) {
            currentIndex--;
            updateModalImage();
            updateNavButtons();
            updateCounter();
        }
    }
    
    // 下一张图片
    function nextImage() {
        if (currentIndex < allImages.length - 1) {
            currentIndex++;
            updateModalImage();
            updateNavButtons();
            updateCounter();
        }
    }
    
    // 事件监听器
    modalClose.addEventListener('click', closeModal);
    modalPrev.addEventListener('click', prevImage);
    modalNext.addEventListener('click', nextImage);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 键盘导航
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) return;
        
        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                prevImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextImage();
                break;
            case 'Home':
                e.preventDefault();
                currentIndex = 0;
                updateModalImage();
                updateNavButtons();
                updateCounter();
                break;
            case 'End':
                e.preventDefault();
                currentIndex = allImages.length - 1;
                updateModalImage();
                updateNavButtons();
                updateCounter();
                break;
        }
    });
    
    // 触摸手势支持（移动端）
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        const minSwipeDistance = 50;
        
        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                // 向右滑动 - 上一张
                prevImage();
            } else {
                // 向左滑动 - 下一张
                nextImage();
            }
        }
    }
    
    // 预加载相邻图片（优化性能）
    function preloadAdjacentImages() {
        const preloadIndices = [];
        
        // 预加载当前图片前后各一张
        if (currentIndex > 0) preloadIndices.push(currentIndex - 1);
        if (currentIndex < allImages.length - 1) preloadIndices.push(currentIndex + 1);
        
        preloadIndices.forEach(index => {
            const img = new Image();
            img.src = allImages[index];
        });
    }
    
    // 监听弹窗显示状态变化，预加载图片
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (modal.classList.contains('show')) {
                    preloadAdjacentImages();
                }
            }
        });
    });
    
    observer.observe(modal, { attributes: true });
    
    // 防止弹窗内容被选中
    modal.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });
    
    // 为文章页面添加特殊样式类
    document.body.classList.add('is-single-page');
    
    // 初始化
    initImageClickEvents();
    
    // 调试信息
    console.log(`图片网格初始化完成，共 ${allImages.length} 张图片`);
    
    // 处理图片加载错误
    function handleImageError() {
        const imageItems = document.querySelectorAll('.post-image-item img');
        
        imageItems.forEach((img, index) => {
            img.addEventListener('error', function() {
                console.warn(`图片加载失败: ${this.src}`);
                this.alt = `图片 ${index + 1} 加载失败`;
                this.style.backgroundColor = 'var(--entry)';
                this.style.color = 'var(--secondary)';
            });
        });
    }
    
    handleImageError();
    
    // 响应式处理
    function handleResize() {
        // 移动端优化：隐藏过多的导航按钮
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            modalPrev.style.fontSize = '24px';
            modalNext.style.fontSize = '24px';
        } else {
            modalPrev.style.fontSize = '30px';
            modalNext.style.fontSize = '30px';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // 初始调用
    
    // 图片懒加载优化
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        // 对于大量图片的情况，实现懒加载
        if (allImages.length > 9) {
            const lazyImages = document.querySelectorAll('.post-image-item img[data-src]');
            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }
});