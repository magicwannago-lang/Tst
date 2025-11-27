const fs = require('fs');
const path = require('path');

console.log('🚀 Starting build process...');

// 创建输出目录
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 创建 index.html
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TST Project - Success</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            padding: 20px;
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 3rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            text-align: center;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        h1 { 
            font-size: 2.5rem; 
            margin-bottom: 1rem;
        }
        .status {
            background: rgba(255,255,255,0.2);
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1.5rem 0;
            text-align: left;
        }
        .success { color: #4ade80; font-weight: bold; }
        .info-item { margin: 0.5rem 0; }
    </style>
</head>
<body>
    <div class="container">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🎉</div>
        <h1>Deployment Successful!</h1>
        <p>Your TST project is now live on Vercel</p>
        
        <div class="status">
            <div class="info-item"><strong>Status:</strong> <span class="success">✅ BUILD_COMPLETED</span></div>
            <div class="info-item"><strong>Build Time:</strong> <span id="buildTime"></span></div>
            <div class="info-item"><strong>Commit:</strong> 5d8b62d</div>
            <div class="info-item"><strong>Region:</strong> Washington, D.C. (iad1)</div>
            <div class="info-item"><strong>Node.js:</strong> ${process.version}</div>
        </div>
        
        <p>You can now start developing your application!</p>
    </div>

    <script>
        document.getElementById('buildTime').textContent = new Date().toLocaleString();
        console.log('TST Project loaded successfully');
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'index.html'), indexHtml);

// 创建 404.html 用于处理未找到的路由
const notFoundHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>Page Not Found - TST Project</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 100px auto; 
            text-align: center; 
            max-width: 500px;
            padding: 20px;
        }
        h1 { color: #ef4444; font-size: 4em; margin: 0; }
    </style>
</head>
<body>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go back to homepage</a>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, '404.html'), notFoundHtml);

// 创建配置文件
fs.writeFileSync(path.join(publicDir, 'config.json'), JSON.stringify({
    project: "TST",
    version: "1.0.0",
    build: {
        timestamp: new Date().toISOString(),
        commit: "5d8b62d",
        region: "iad1"
    }
}, null, 2));

console.log('✅ Build completed! Generated files:');
console.log('📁 ' + fs.readdirSync(publicDir).join('\n📁 '));
console.log('Total files: ' + fs.readdirSync(publicDir).length);