const path = require("path");

// 配置别名
module.exports = {
  webpack: {
    alias: {
      "@": path.join(__dirname, "src")
    }
  }
};
