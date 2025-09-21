# 🐱 Scale Viewport

> 移动端设计稿完美缩放适配解决方案 - Perfect scaling solution for mobile design drafts

[![npm version](https://badge.fury.io/js/scale-viewport.svg)](https://badge.fury.io/js/scale-viewport)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## ✨ 特性

- 🎯 **完美缩放** - 基于设计稿宽度的精确等比例缩放
- 📱 **响应式适配** - PC端固定宽度，移动端自适应铺满
- 🔄 **布局一致性** - 无论设备如何，布局比例完全相同
- ✅ **CSS特性兼容** - 完美支持sticky定位、overflow滚动等
- 🚀 **性能优异** - 使用CSS transform硬件加速
- 🔧 **易于集成** - 支持Vue、React等各种框架
- 📦 **TypeScript支持** - 完整的类型定义

## 🚀 安装

```bash
npm install scale-viewport
# 或
yarn add scale-viewport
# 或
pnpm add scale-viewport
```

## 📖 基本用法

### HTML 结构

```html
<div id="wrapper">
    <div id="content">
        <!-- 按750px设计稿正常开发 -->
        <div class="header">Header</div>
        <div class="main">Main Content</div>
    </div>
</div>
```

### JavaScript 使用

```javascript
import { createScaleViewport } from 'scale-viewport';

// 获取DOM元素
const wrapper = document.getElementById('wrapper');
const content = document.getElementById('content');

// 创建缩放实例
const scaleViewport = createScaleViewport(
    { content, wrapper },
    {
        designWidth: 750,    // 设计稿宽度
        pcWidth: 390,        // PC端显示宽度
        mobileBreakpoint: 768, // 移动端断点
        debug: true          // 开启调试日志
    }
);
```

### TypeScript 使用

```typescript
import { ScaleViewport, ScaleViewportConfig, ScaleViewportElements } from 'scale-viewport';

const elements: ScaleViewportElements = {
    content: document.getElementById('content') as HTMLElement,
    wrapper: document.getElementById('wrapper') as HTMLElement
};

const config: ScaleViewportConfig = {
    designWidth: 750,
    pcWidth: 390,
    mobileBreakpoint: 768,
    debug: process.env.NODE_ENV === 'development'
};

const scaleViewport = new ScaleViewport(elements, config);
```

## 🎨 CSS 样式建议

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body, html {
    height: 100vh;
    overflow-x: hidden;
}

#wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    background-color: #f0f0f0;
}

#content {
    /* 宽度和缩放由 ScaleViewport 自动设置 */
    background-color: white;
}

/* 示例：sticky 定位完美支持 */
.sticky-header {
    position: sticky;
    top: 0;
    background: white;
    z-index: 100;
}
```

## 🔧 API 参考

### ScaleViewportConfig

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `designWidth` | `number` | - | 设计稿宽度（必需） |
| `pcWidth` | `number` | - | PC端目标显示宽度（必需） |
| `mobileBreakpoint` | `number` | `768` | 移动端断点，小于等于此值视为移动端 |
| `debug` | `boolean` | `false` | 是否启用调试日志 |

### ScaleViewportElements

| 参数 | 类型 | 说明 |
|------|------|------|
| `content` | `HTMLElement` | 内容容器元素，设计稿内容的直接容器 |
| `wrapper` | `HTMLElement` | 外层包装元素，用于居中和定位 |

### 实例方法

```typescript
// 获取当前缩放比例
const scale = scaleViewport.getCurrentScale();

// 获取当前是否为移动端
const isMobile = scaleViewport.isMobile();

// 获取当前视觉宽度
const visualWidth = scaleViewport.getVisualWidth();

// 手动刷新缩放（DOM结构变化时）
scaleViewport.refresh();

// 更新配置
scaleViewport.updateConfig({ pcWidth: 400 });

// 销毁实例
scaleViewport.destroy();
```

### 事件监听

```javascript
content.addEventListener('scalechange', (event) => {
    const { scale, isMobile, visualWidth } = event.detail;
    console.log('缩放变化:', { scale, isMobile, visualWidth });
});
```

## 🌟 框架集成示例

### Vue 3

```vue
<template>
    <div ref="wrapper" class="wrapper">
        <div ref="content" class="content">
            <!-- 按750px设计稿开发 -->
            <div class="page">
                <header class="header">Header</header>
                <main class="main">Content</main>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { createScaleViewport } from 'scale-viewport';

const wrapper = ref();
const content = ref();
let scaleViewport = null;

onMounted(() => {
    scaleViewport = createScaleViewport(
        { 
            content: content.value, 
            wrapper: wrapper.value 
        },
        {
            designWidth: 750,
            pcWidth: 390,
            debug: true
        }
    );
});

onUnmounted(() => {
    scaleViewport?.destroy();
});
</script>
```

### React

```jsx
import React, { useRef, useEffect } from 'react';
import { createScaleViewport } from 'scale-viewport';

function App() {
    const wrapperRef = useRef();
    const contentRef = useRef();
    const scaleViewportRef = useRef();

    useEffect(() => {
        scaleViewportRef.current = createScaleViewport(
            {
                content: contentRef.current,
                wrapper: wrapperRef.current
            },
            {
                designWidth: 750,
                pcWidth: 390,
                debug: process.env.NODE_ENV === 'development'
            }
        );

        return () => {
            scaleViewportRef.current?.destroy();
        };
    }, []);

    return (
        <div ref={wrapperRef} className="wrapper">
            <div ref={contentRef} className="content">
                {/* 按750px设计稿开发 */}
                <header>Header</header>
                <main>Content</main>
            </div>
        </div>
    );
}
```

## 🎯 解决的问题

### 1. 设计稿完美还原
- ✅ 750px设计稿在PC端显示为390px
- ✅ 移动端自适应铺满整个屏幕
- ✅ 布局比例在所有设备上完全一致

### 2. CSS特性兼容
- ✅ `position: sticky` 正常工作
- ✅ `overflow: auto` 滚动正常
- ✅ CSS动画和过渡效果保持一致

### 3. UI库兼容性
- ✅ 支持Vant、Ant Design Mobile等UI库
- ✅ 弹窗、遮罩等组件正常显示
- ✅ 通过禁用滚动解决fixed定位问题

## 🔍 高级用法

### 处理UI库弹窗

```javascript
// 当显示弹窗时禁用内容滚动
function showPopup() {
    document.getElementById('content').style.overflow = 'hidden';
    // 显示UI库弹窗
    showVantPopup();
}

function hidePopup() {
    document.getElementById('content').style.overflow = 'auto';
    // 隐藏UI库弹窗
    hideVantPopup();
}
```

### 动态配置更新

```javascript
// 根据用户偏好动态调整PC端宽度
const userPreference = getUserPreference();
scaleViewport.updateConfig({
    pcWidth: userPreference.pcWidth || 390
});
```

## 🤔 常见问题

### Q: 为什么不用rem或vw方案？
A: rem和vw方案会改变字体大小和布局逻辑，而scale方案保持设计稿的原始尺寸，只是视觉缩放，确保100%还原设计稿。

### Q: 如何处理UI库的fixed定位问题？
A: 当弹窗显示时，将content的overflow设为hidden，禁用滚动即可解决。

### Q: 支持横屏适配吗？
A: 支持，会根据当前视口宽度自动调整缩放比例。

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🐱 作者

由秦篆 (Qin Zhuan) 用爱发电制作 ✨  
个人博客：[qinzhuan.top](https://qinzhuan.top)

---

如果这个库帮到了你，请给个 ⭐️ 支持一下！
