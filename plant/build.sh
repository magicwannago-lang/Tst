#!/bin/bash
set -e

echo "🚀 Starting build process..."

# 创建输出目录
mkdir -p public

# 创建主要的 HTML 文件
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TST Project - Vercel Deployment</title>
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
        }
        .container {
            background: rgba(255,255,255,0.1);
            padding: 3rem;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            text-align: center;
            max-width: 500px;
            width: 90%;
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
        }
        .success { color: #4ade80; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 Success!</h1>
        <p>Your TST project is successfully deployed on Vercel.</p>
        
        <div class="status">
            <p><strong>Build Status:</strong> <span class="success">✅ Completed</span></p>
            <p><strong>Build Time:</strong> <span id="buildTime"></span></p>
            <p><strong>Commit:</strong> 5d8b62d</p>
            <p><strong>Region:</strong> Washington, D.C. (iad1)</p>
        </div>
        
        <p>Ready to start developing your application!</p>
    </div>

    <script>
        document.getElementById('buildTime').textContent = new Date().toLocaleString();
    </script>
</body>
</html>
EOF

# 创建额外的文件确保构建有内容
echo "Build successful at $(date)" > public/build-info.txt
echo "Commit: 5d8b62d" >> public/build-info.txt

# 创建配置验证文件
echo '{"deployment": "success", "timestamp": "'$(date -Iseconds)'"}' > public/deploy.json

# 设置正确的权限
chmod -R 755 public

echo "✅ Build completed! Generated files:"
ls -la public/
echo "📁 Total files generated: $(find public -type f | wc -l)"