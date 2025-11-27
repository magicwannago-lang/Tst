const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 提供静态文件
app.use(express.static('public'));

// 所有路由都返回 index.html（用于 SPA）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});