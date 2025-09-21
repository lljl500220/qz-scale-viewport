"use strict";
// 🐱 Scale Viewport - 主入口文件
// 移动端设计稿完美缩放适配解决方案
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERSION = exports.createScaleViewport = exports.ScaleViewport = void 0;
var ScaleViewport_1 = require("./ScaleViewport");
Object.defineProperty(exports, "ScaleViewport", { enumerable: true, get: function () { return ScaleViewport_1.ScaleViewport; } });
Object.defineProperty(exports, "createScaleViewport", { enumerable: true, get: function () { return ScaleViewport_1.createScaleViewport; } });
const ScaleViewport_2 = require("./ScaleViewport");
// 版本信息
exports.VERSION = '1.0.0';
// 如果在浏览器环境中，可以选择挂载到全局
if (typeof window !== 'undefined') {
    window.ScaleViewport = ScaleViewport_2.ScaleViewport;
    window.createScaleViewport = ScaleViewport_2.createScaleViewport;
}
