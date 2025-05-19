# 开发指南

## 开发流程

* 使用`npm run watch`开启自动编译，这样每次保存文件时都会自动编译
* 在VS Code扩展开发主机中调试插件（按下F5键）
* 在扩展开发主机窗口的命令面板中，运行命令"Convert LaTeX to MathJax"进行测试

## 自定义配置

* 该扩展的配置在`package.json`文件的`contributes`部分
* 有关可配置选项的完整文档，请查看[扩展清单](https://code.visualstudio.com/api/references/extension-manifest)

## 打包

* 使用`npx vsce package`命令将项目打包为.vsix文件
* 打包前确保已经安装了vsce：`npm install -g @vscode/vsce`

## 发布

* 若要发布到VS Code应用商店，请参阅[发布扩展](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)的官方指南
* 注意：需要一个Azure DevOps组织和个人访问令牌来发布扩展 