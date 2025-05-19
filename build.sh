#!/bin/bash
# 构建VS Code插件的脚本

# 安装依赖
echo "正在安装依赖..."
npm install

# 编译TypeScript
echo "正在编译TypeScript..."
npm run compile

# 打包为VSIX
echo "正在打包插件..."
npx vsce package

echo "构建完成！"
echo "可以使用VS Code的'Extensions: Install from VSIX'命令安装生成的.vsix文件" 