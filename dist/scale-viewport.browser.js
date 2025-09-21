// 🐱 Scale Viewport - 浏览器版本 (修复版)
// 移动端设计稿完美缩放适配解决方案
(function (global) {
    'use strict';

    // 直接使用原始的、能工作的函数式方案
    function setContentScale(elements, config) {
        const { content, wrapper } = elements;
        const { designWidth = 750, pcWidth = 390, mobileBreakpoint = 768 } = config;
        
        if (!content || !wrapper) {
            console.error('[ScaleViewport] content和wrapper元素都是必需的');
            return;
        }
        
        const screenWidth = window.innerWidth;
        let scale;
        
        // 判断是否为移动端
        if (screenWidth <= mobileBreakpoint) {
            // 移动端：按屏幕宽度缩放，让设计稿容器铺满屏幕
            scale = screenWidth / designWidth;
            
            // 调整transform-origin为top left，避免居中导致的位置问题
            content.style.transformOrigin = 'top left';
            content.style.position = 'absolute';
            content.style.left = '0';
            content.style.top = '0';
            
            // wrapper不需要flex居中
            wrapper.style.display = 'block';
            wrapper.style.justifyContent = 'flex-start';
            
        } else {
            // PC端：固定缩放到指定宽度，保持居中
            scale = pcWidth / designWidth;
            
            content.style.transformOrigin = 'top center';
            content.style.position = 'static';
            content.style.left = 'auto';
            content.style.top = 'auto';
            
            // wrapper使用flex居中
            wrapper.style.display = 'flex';
            wrapper.style.justifyContent = 'center';
        }
        
        // 设置缩放和高度 - 这是关键！
        content.style.transform = `scale(${scale})`;
        content.style.height = `${100 / scale}vh`;
        
        return { scale, isMobile: screenWidth <= mobileBreakpoint };
    }

    // 简化的ScaleViewport类
    class ScaleViewport {
        constructor(elements, config) {
            this.elements = elements;
            this.config = {
                designWidth: 750,
                pcWidth: 390,
                mobileBreakpoint: 768,
                debug: false,
                ...config
            };
            
            this.init();
        }

        init() {
            // 初始缩放
            this.updateScale();
            
            // 监听窗口变化
            this.resizeHandler = () => this.updateScale();
            window.addEventListener('resize', this.resizeHandler);
            
            if (this.config.debug) {
                console.log('🐱 ScaleViewport 初始化完成');
            }
        }

        updateScale() {
            const result = setContentScale(this.elements, this.config);
            if (result && this.config.debug) {
                console.log(`🐱 ${result.isMobile ? '移动端' : 'PC端'} 缩放: ${result.scale.toFixed(4)}`);
            }
            return result;
        }

        getCurrentScale() {
            const screenWidth = window.innerWidth;
            const isMobile = screenWidth <= this.config.mobileBreakpoint;
            return isMobile 
                ? screenWidth / this.config.designWidth
                : this.config.pcWidth / this.config.designWidth;
        }

        isMobile() {
            return window.innerWidth <= this.config.mobileBreakpoint;
        }

        getVisualWidth() {
            return this.config.designWidth * this.getCurrentScale();
        }

        refresh() {
            this.updateScale();
        }

        destroy() {
            if (this.resizeHandler) {
                window.removeEventListener('resize', this.resizeHandler);
                this.resizeHandler = null;
            }
        }
    }

    // 便捷的工厂函数
    function createScaleViewport(elements, config) {
        return new ScaleViewport(elements, config);
    }

    // 导出到全局
    global.ScaleViewport = ScaleViewport;
    global.createScaleViewport = createScaleViewport;

    console.log('🐱 Scale Viewport 浏览器版本已加载！(修复版)');

})(typeof window !== 'undefined' ? window : this);
