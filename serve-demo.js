// 🐱 小喵的开发服务器 - 用于演示Scale Viewport
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath;
    
    if (req.url === '/' || req.url === '/demo') {
        filePath = path.join(__dirname, 'src/demo.html');
    } else {
        filePath = path.join(__dirname, req.url);
    }
    
    const extname = path.extname(filePath);
    const contentType = mimeTypes[extname] || 'text/plain';
    
    // 添加CORS头部支持ES模块
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <h1>404 - 文件未找到</h1>
                    <p>请求的文件: ${req.url}</p>
                    <p><a href="/demo">返回演示页面</a></p>
                `);
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`<h1>服务器错误: ${err.code}</h1>`);
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType + (contentType.startsWith('text') ? '; charset=utf-8' : '')
            });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`🐱 Scale Viewport 演示服务器启动成功！`);
    console.log(`🌐 访问地址: http://localhost:${PORT}/demo`);
    console.log(`📱 建议用浏览器开发者工具测试移动端效果`);
    console.log(`🛑 按 Ctrl+C 停止服务器`);
});
