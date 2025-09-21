export interface ScaleViewportConfig {
    /** 设计稿宽度 (px) */
    designWidth: number;
    /** PC端目标显示宽度 (px) */
    pcWidth: number;
    /** 移动端断点 (px)，小于等于此值视为移动端 */
    mobileBreakpoint?: number;
    /** 是否启用调试日志 */
    debug?: boolean;
}
export interface ScaleViewportElements {
    /** 内容容器元素 - 设计稿内容的直接容器 */
    content: HTMLElement;
    /** 外层包装元素 - 用于居中和定位 */
    wrapper: HTMLElement;
}
export declare class ScaleViewport {
    private config;
    private elements;
    private isDestroyed;
    private resizeHandler;
    constructor(elements: ScaleViewportElements, config: ScaleViewportConfig);
    private validateParams;
    private init;
    private setupInitialStyles;
    private updateScale;
    private handleResize;
    private dispatchScaleEvent;
    private log;
    /** 获取当前缩放比例 */
    getCurrentScale(): number;
    /** 获取当前是否为移动端 */
    isMobile(): boolean;
    /** 获取当前视觉宽度 */
    getVisualWidth(): number;
    /** 手动刷新缩放（当DOM结构变化时使用） */
    refresh(): void;
    /** 更新配置 */
    updateConfig(newConfig: Partial<ScaleViewportConfig>): void;
    /** 销毁实例，清理事件监听 */
    destroy(): void;
}
export declare function createScaleViewport(elements: ScaleViewportElements, config: ScaleViewportConfig): ScaleViewport;
export default ScaleViewport;
