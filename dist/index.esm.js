// 🐱 Scale Viewport - 主入口文件
// 移动端设计稿完美缩放适配解决方案
export { ScaleViewport, createScaleViewport } from './ScaleViewport.esm.js';
import { ScaleViewport, createScaleViewport } from './ScaleViewport.esm.js';
// 版本信息
export const VERSION = '1.0.0';
// 如果在浏览器环境中，可以选择挂载到全局
if (typeof window !== 'undefined') {
    window.ScaleViewport = ScaleViewport;
    window.createScaleViewport = createScaleViewport;
}
