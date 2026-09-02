// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copy-path-with-line-numbers" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	const disposable = vscode.commands.registerCommand('copyRelativePathWithLines.copy', () => {
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
			vscode.window.showInformationMessage(`Copied to clipboard!`);
		});
	});

	context.subscriptions.push(disposable);
}

export function formatSelections(selections: readonly vscode.Selection[]): string[] {
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


// This method is called when your extension is deactivated
export function deactivate() {}
