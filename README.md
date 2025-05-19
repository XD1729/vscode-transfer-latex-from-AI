# Transfer LaTeX from DeepSeek - VS Code 插件

## 1. 介绍

本插件用于将DeepSeek回答中的LaTeX公式转换为正确的MathJax格式。当你从DeepSeek复制包含数学公式的内容到VS Code时，可以使用此插件快速转换LaTeX公式格式，使其符合标准Markdown渲染要求。

## 2. 安装方法

### 从VSIX文件安装

1. 下载此仓库的发布版本中的 `.vsix`文件
2. 在VS Code中，按下 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS）打开命令面板
3. 输入"Extensions: Install from VSIX"
4. 选择下载的 `.vsix`文件
5. 安装完成后重启VS Code

### 手动构建并安装

1. 克隆此仓库到本地：
   ```
   git clone https://github.com/yourname/vscode-transfer-latex-from-deepseek.git
   ```
2. 进入项目目录：
   ```
   cd vscode-transfer-latex-from-deepseek
   ```
3. 安装依赖：
   ```
   npm install
   ```
4. 打包插件：
   ```
   npm run vscode:prepublish
   npx vsce package
   ```
5. 安装生成的 `.vsix`文件：
   在VS Code命令面板中执行"Extensions: Install from VSIX"命令，选择生成的vsix文件

## 3. 使用方法

插件提供了三种方式使用：

### 方式一：使用命令面板

1. 打开包含LaTeX公式的Markdown文件
2. 按下 `Ctrl+Shift+P`（Windows/Linux）或 `Cmd+Shift+P`（macOS）打开命令面板
3. 输入"Convert LaTeX to MathJax"并执行命令

### 方式二：使用右键菜单

1. 在Markdown文件中右键点击
2. 在上下文菜单中选择"Convert LaTeX to MathJax"

### 方式三：使用状态栏按钮

当打开Markdown文件时，状态栏（右下角）会显示"Convert LaTeX"按钮，点击即可执行转换

### 支持的转换格式

- `\( ... \)` 将被转换为 `$ ... $`
- `\[ ... \]` 将被转换为 `$$ ... $$`

## 4. 新特性

- **工作区支持**：现在可以在VS Code工作区中正常使用插件
- **状态栏按钮**：添加了状态栏按钮，方便快速访问
- **右键菜单**：可以通过右键菜单快速执行转换
- **智能编辑器检测**：即使当前编辑器不在焦点状态，也能找到并处理Markdown文件

## 5. 注意事项

- 此插件主要用于处理从DeepSeek等AI助手复制的包含LaTeX公式的文本
- 转换是对整个文档进行的，请确保文档中不包含不应被修改的类似格式

## 6. 开源许可

此插件采用MIT许可证。
