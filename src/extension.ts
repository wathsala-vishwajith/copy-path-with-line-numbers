// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	const copyPathDisposable = vscode.commands.registerCommand('copyRelativePathWithLines.copy', () => {
		// Implementation for copying relative path with line numbers
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return;
		}
		//extract the relative path of the file in the workspace
		const relativePath = vscode.workspace.asRelativePath(editor.document.uri, false);


		const ranges = formatSelections(editor.selections);
		const result = `${relativePath}:${ranges.join(',')}`;

		vscode.env.clipboard.writeText(result).then(() => {
			vscode.window.setStatusBarMessage(`Copied to clipboard!`, 3000);
		});
	});

	const copyAbsolutePathDisposable = vscode.commands.registerCommand('copyRelativePathWithLines.copyAbsolute', () => {
		// Implementation for copying absolute path with line numbers
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return;
		}
		const absolutePath = editor.document.uri.fsPath;

		const ranges = formatSelections(editor.selections);
		const result = `${absolutePath}:${ranges.join(',')}`;

		vscode.env.clipboard.writeText(result).then(() => {
			vscode.window.setStatusBarMessage(`Copied to clipboard!`, 3000);
		});
	});

	// command to copy the code with line numbers
	const copyCodeDisposable = vscode.commands.registerCommand('copyRelativePathWithLines.copyWithLineNumbers', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return;
		}
		const formattedText = getFormattedTextForSelections(editor);

		vscode.env.clipboard.writeText(formattedText).then(() => {
			vscode.window.setStatusBarMessage(`Copied code with line numbers to clipboard!`, 3000);
		});
	});

	const copyCodeBlockDisposable = vscode.commands.registerCommand('copyRelativePathWithLines.copyWithLineNumbersCodeBlock', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showErrorMessage('No active editor found.');
			return;
		}
		const formattedText = getFormattedTextForSelections(editor);
		const codeBlock = `\`\`\`\n${formattedText}\n\`\`\``;

		vscode.env.clipboard.writeText(codeBlock).then(() => {
			vscode.window.setStatusBarMessage(`Copied code block with line numbers to clipboard!`, 3000);
		});
	});
	context.subscriptions.push(copyCodeBlockDisposable);
	context.subscriptions.push(copyCodeDisposable);
	context.subscriptions.push(copyPathDisposable);
	context.subscriptions.push(copyAbsolutePathDisposable);
}

export function formatSelections(selections: readonly vscode.Selection[]): string[] {
	// Format each selection into a line range string e.g., "5", "3-6", "2-3,11"
	const parts = selections.map(selection => {
		const startLine = selection.start.line + 1; // Convert to 1-based line number
		const endLine = selection.end.line + 1; // Convert to 1-based line number

		//if the selection is till the start of the next line, we should not include that line in the range
		if (selection.end.character === 0 && startLine < endLine) {
			return `${startLine}-${endLine - 1}`;
		}

		if (startLine === endLine) {
			return `${startLine}`;
		} else {
			return `${startLine}-${endLine}`;
		}
	});

	//dedupe and sort by starting line
	const uniqueParts = Array.from(new Set(parts));
	return uniqueParts.sort((a, b) => parseInt(a) - parseInt(b));
}

export function formatSelectionsForCopy(lines:Array<{lineNumber: number; text: string}>): string {
	// Format the lines into a string with line numbers and text, e.g., " 1: line1\n 2: line2"
	if (lines.length === 0) {
		return '';
	}
	//find the max line number to determine the padding
	const maxLineNumber = Math.max(...lines.map(line => line.lineNumber));
	const padding = maxLineNumber.toString().length;
	
	return lines.map(({lineNumber, text}) => {
		const paddedLineNumber = lineNumber.toString().padStart(padding, ' ');
		return `${paddedLineNumber}: ${text}`;
	}).join('\n');
}

export function getLinesFromSelection(document: vscode.TextDocument, selection: vscode.Selection): Array<{lineNumber: number; text: string}> {
	let startLine = selection.start.line;
	let endLine = selection.end.line;

	//if the selection is till the start of the next line, we should not include that line in the range
	if (selection.end.character === 0 && startLine < endLine) {
		endLine -= 1;
	}

	const lines: Array<{lineNumber: number; text: string}> = [];

	// need to remove extra padding but keep the indentation of the code. 
	// need to find the minimum indentation of the selected lines and remove that from all lines.
	let minIndentation = Infinity;
	for (let i = startLine; i <= endLine; i++) {
		const lineText = document.lineAt(i).text;
		if (lineText.trim() !== '') {
			const leadingSpaces = lineText.match(/^(\s*)/);
			if (leadingSpaces) {
				minIndentation = Math.min(minIndentation, leadingSpaces[0].length);
			}
		}
	}

	for (let i = startLine; i <= endLine; i++) {
		let lineText = document.lineAt(i).text;
		if (minIndentation < Infinity) {
			lineText = lineText.substring(minIndentation);
		}
		lines.push({lineNumber: i + 1, text: lineText});
	}
	return lines;
}

export function getFormattedTextForSelections(editor: vscode.TextEditor): string {
	const selections = [...editor.selections];
		// sort the selections by starting line number
		selections.sort((a: vscode.Selection, b: vscode.Selection) => a.start.line - b.start.line);

		let linesToCopy: Array<{lineNumber: number; text: string}> = [];

		const blocks = selections.map((selection) => {
			const lines = getLinesFromSelection(editor.document, selection);
			return formatSelectionsForCopy(lines);
		});

		//format with an extra new line between blocks of code
		const formattedText = blocks.join('\n\n');

		return formattedText;
	}


// This method is called when your extension is deactivated
export function deactivate() {}
