"use strict";
// 🐱 小喵的智能缩放库 - Scale Viewport
// 用于解决移动端设计稿在不同设备上的完美缩放适配问题
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScaleViewport = void 0;
exports.createScaleViewport = createScaleViewport;
class ScaleViewport {
    constructor(elements, config) {
        this.isDestroyed = false;
        // 参数验证
        this.validateParams(elements, config);
        this.elements = elements;
        this.config = Object.assign({ mobileBreakpoint: 768, debug: false }, config);
        // 绑定事件处理器
        this.resizeHandler = this.handleResize.bind(this);
        // 初始化
        this.init();
    }
    validateParams(elements, config) {
        if (!elements.content || !elements.wrapper) {
            throw new Error('[ScaleViewport] content和wrapper元素都是必需的');
        }
        if (!elements.content.parentElement) {
            throw new Error('[ScaleViewport] content元素必须已插入到DOM中');
        }
        if (config.designWidth <= 0 || config.pcWidth <= 0) {
            throw new Error('[ScaleViewport] designWidth和pcWidth必须大于0');
        }
        if (config.pcWidth >= config.designWidth) {
            console.warn('[ScaleViewport] pcWidth大于等于designWidth，可能不需要缩放');
        }
    }
    init() {
        this.log('🐱 ScaleViewport 初始化开始');
        // 设置初始样式
        this.setupInitialStyles();
        // 执行首次缩放
        this.updateScale();
        // 监听窗口大小变化
        window.addEventListener('resize', this.resizeHandler);
        this.log('🐱 ScaleViewport 初始化完成');
    }
    setupInitialStyles() {
        const { content, wrapper } = this.elements;
        // 只设置必要的样式，不干扰CSS的初始设置
        if (!wrapper.style.position) {
            wrapper.style.position = 'relative';
        }
        if (!wrapper.style.overflowX) {
            wrapper.style.overflowX = 'hidden';
        }
        // content的基础样式通常由CSS设置，这里只确保关键属性
        if (!content.style.width) {
            content.style.width = `${this.config.designWidth}px`;
        }
        // 不要覆盖CSS中已经设置的overflow-y
    }
    updateScale() {
        if (this.isDestroyed)
            return;
        const { content, wrapper } = this.elements;
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth <= this.config.mobileBreakpoint;
        let scale;
        if (isMobile) {
            // 移动端：按屏幕宽度缩放，让设计稿容器铺满屏幕
            scale = screenWidth / this.config.designWidth;
            // 移动端样式设置
            content.style.transformOrigin = 'top left';
            content.style.position = 'absolute';
            content.style.left = '0';
            content.style.top = '0';
            // wrapper不需要flex居中
            wrapper.style.display = 'block';
            wrapper.style.justifyContent = 'flex-start';
        }
        else {
            // PC端：固定缩放到指定宽度，保持居中
            scale = this.config.pcWidth / this.config.designWidth;
            // PC端样式设置
            content.style.transformOrigin = 'top center';
            content.style.position = 'static';
            content.style.left = 'auto';
            content.style.top = 'auto';
            // wrapper使用flex居中
            wrapper.style.display = 'flex';
            wrapper.style.justifyContent = 'center';
        }
        // 应用缩放和高度设置（关键！）
        content.style.transform = `scale(${scale})`;
        content.style.height = `${100 / scale}vh`;
        this.log(`${isMobile ? '移动端' : 'PC端'} 缩放更新`, {
            screenWidth: `${screenWidth}px`,
            scale: scale.toFixed(4),
            visualWidth: `${(this.config.designWidth * scale).toFixed(0)}px`,
            contentHeight: `${(100 / scale).toFixed(2)}vh`
        });
        // 触发自定义事件
        this.dispatchScaleEvent(scale, isMobile);
    }
    handleResize() {
        // 防抖处理
        clearTimeout(this.resizeHandler.timeoutId);
        this.resizeHandler.timeoutId = setTimeout(() => {
            this.updateScale();
        }, 16); // 约60fps
    }
    dispatchScaleEvent(scale, isMobile) {
        const event = new CustomEvent('scalechange', {
            detail: {
                scale,
                isMobile,
                designWidth: this.config.designWidth,
                pcWidth: this.config.pcWidth,
                visualWidth: this.config.designWidth * scale
            }
        });
        this.elements.content.dispatchEvent(event);
    }
    log(message, data) {
        if (this.config.debug) {
            if (data) {
                console.log(message, data);
            }
            else {
                console.log(message);
            }
        }
    }
    // 公共API方法
    /** 获取当前缩放比例 */
    getCurrentScale() {
        const screenWidth = window.innerWidth;
        const isMobile = screenWidth <= this.config.mobileBreakpoint;
        return isMobile
            ? screenWidth / this.config.designWidth
            : this.config.pcWidth / this.config.designWidth;
    }
    /** 获取当前是否为移动端 */
    isMobile() {
        return window.innerWidth <= this.config.mobileBreakpoint;
    }
    /** 获取当前视觉宽度 */
    getVisualWidth() {
        return this.config.designWidth * this.getCurrentScale();
    }
    /** 手动刷新缩放（当DOM结构变化时使用） */
    refresh() {
        this.updateScale();
    }
    /** 更新配置 */
    updateConfig(newConfig) {
        this.config = Object.assign(Object.assign({}, this.config), newConfig);
        this.updateScale();
        this.log('🐱 配置已更新', this.config);
    }
    /** 销毁实例，清理事件监听 */
    destroy() {
        if (this.isDestroyed)
            return;
        window.removeEventListener('resize', this.resizeHandler);
        this.isDestroyed = true;
        this.log('🐱 ScaleViewport 已销毁');
    }
}
exports.ScaleViewport = ScaleViewport;
// 便捷的工厂函数
function createScaleViewport(elements, config) {
    return new ScaleViewport(elements, config);
}
// 默认导出
exports.default = ScaleViewport;
