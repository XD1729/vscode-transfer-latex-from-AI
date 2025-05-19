import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('插件 "vscode-transfer-latex-from-gpt" 已激活');

	// 注册命令：将LaTeX公式转换为MathJax格式
	let disposable = vscode.commands.registerCommand('vscode-transfer-latex-from-gpt.convertLatexToMathJax', async () => {
		// 获取当前活动的编辑器
		const editor = vscode.window.activeTextEditor;
		
		// 检查编辑器是否存在
		if (!editor) {
			// 尝试查找当前打开的文档
			const openEditors = vscode.window.visibleTextEditors;
			
			if (openEditors.length === 0) {
				vscode.window.showInformationMessage('请确保在使用此命令前已打开一个Markdown文件');
				return;
			}
			
			// 尝试找到一个Markdown编辑器
			const mdEditor = openEditors.find(e => e.document.languageId === 'markdown');
			
			if (mdEditor) {
				// 如果找到Markdown编辑器，使用它来处理
				await processEditor(mdEditor);
			} else {
				// 如果没有找到Markdown编辑器，尝试使用第一个可见的编辑器
				await processEditor(openEditors[0]);
			}
			return;
		}
		
		// 如果editor存在，直接处理
		await processEditor(editor);
	});

	context.subscriptions.push(disposable);
	
	// 添加状态栏按钮
	const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	statusBarItem.command = 'vscode-transfer-latex-from-gpt.convertLatexToMathJax';
	statusBarItem.text = '$(symbol-misc) Convert LaTeX';
	statusBarItem.tooltip = '将LaTeX公式转换为MathJax格式';
	
	// 在Markdown文件激活时显示按钮
	context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
		if (editor && editor.document.languageId === 'markdown') {
			statusBarItem.show();
		} else {
			statusBarItem.hide();
		}
	}));
	
	// 初始状态检查
	if (vscode.window.activeTextEditor && 
		vscode.window.activeTextEditor.document.languageId === 'markdown') {
		statusBarItem.show();
	}
	
	context.subscriptions.push(statusBarItem);
}

// 处理编辑器内容的通用函数
async function processEditor(editor: vscode.TextEditor): Promise<void> {
	// 获取文档内容
	const document = editor.document;
	
	// 检查是否为Markdown文件
	if (document.languageId !== 'markdown') {
		vscode.window.showInformationMessage('此命令仅适用于Markdown文件');
		return;
	}
	
	const fullText = document.getText();
	
	// 执行转换
	const convertedText = convertLatexSyntax(fullText);
	
	// 应用更改
	const success = await editor.edit((editBuilder) => {
		const entireRange = new vscode.Range(
			document.positionAt(0),
			document.positionAt(fullText.length)
		);
		editBuilder.replace(entireRange, convertedText);
	});
	
	if (success) {
		vscode.window.showInformationMessage('LaTeX公式已成功转换为MathJax格式');
	} else {
		vscode.window.showErrorMessage('转换失败');
	}
}

// 将LaTeX语法转换为MathJax格式
function convertLatexSyntax(content: string): string {
	// 替换行内公式 \( ... \) 为 $ ... $
	const inlineRegex = /\\\(\s*(.*?)\s*\\\)/gs;
	let updatedContent = content.replace(inlineRegex, (match, formula) => `$${formula.trim()}$`);

	// 替换块级公式 \[ ... \] 为 $$ ... $$
	const blockRegex = /\\\[\s*(.*?)\s*\\\]/gs;
	updatedContent = updatedContent.replace(blockRegex, (match, formula) => `$$${formula.trim()}$$`);

	return updatedContent;
}

export function deactivate() {} 