const fs = require('fs');
const path = require('path');

// 创建 public 目录
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 创建 index.html
const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>TST Project - Vercel Deployment</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0;
            padding: 40px 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: white;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 40px;
            border-radius: 16px;
            backdrop-filter: blur(10px);
        }
        h1 {
            margin-top: 0;
            font-size: 2.5em;
        }
        .status {
            background: rgba(255,255,255,0.2);
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Deployment Successful!</h1>
        <p>Your TST project is now live on Vercel.</p>
        
        <div class="status">
            <h3>Build Information</h3>
            <p><strong>Status:</strong> ✅ Build Completed</p>
            <p><strong>Build Time:</strong> <span id="time"></span></p>
            <p><strong>Commit:</strong> 4514f40</p>
            <p><strong>Region:</strong> iad1 (Washington, D.C.)</p>
        </div>
        
        <p>Next steps: Start building your application!</p>
    </div>

    <script>
        document.getElementById('time').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'index.html'), htmlContent);
console.log('✅ Build completed! Created public/index.html');