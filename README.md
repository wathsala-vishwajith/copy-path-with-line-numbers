# Copy Path with Line Numbers

A VS Code extension that gives you four clipboard commands for sharing precise code references — perfect for GitHub comments, code reviews, and pair programming.

---
## Demo

![Demo of Copy Path with Line Numbers extension](images/demo.gif)

---

## Features

### 1 · Copy Relative Path with Line Number(s)

Copies the workspace-relative file path appended with the current cursor line or selection range(s).

**Single cursor (no selection)**
```
src/utils/parser.ts:42
```

**Single range selection**
```
src/utils/parser.ts:10-24
```

**Multiple non-contiguous selections (multi-cursor)**
```
src/utils/parser.ts:10-24,38,55-60
```

> **Tip:** Range notation follows the `start-end` convention (`-` separator). Ranges are always sorted and deduplicated. A selection that ends exactly at the start of the next line does *not* include that line in the range.

---

### 2 · Copy Absolute Path with Line Number(s)

Copies the full filesystem path appended with the current cursor line or selection range(s).

**Single cursor (no selection)**
```
/Users/alice/projects/app/src/utils/parser.ts:42
```

**Single range selection**
```
/Users/alice/projects/app/src/utils/parser.ts:10-24
```

**Multiple non-contiguous selections (multi-cursor)**
```
/Users/alice/projects/app/src/utils/parser.ts:10-24,38,55-60
```

---

### 3 · Copy Code with Line Numbers

Copies the selected code to the clipboard with right-aligned, padded line numbers prepended to every line.

**Example** — selecting lines 9–11 of a file:
```
 9: const parser = new Parser();
10: parser.load(input);
11: return parser.run();
```

- Line numbers are padded to the width of the widest line number in the selection.
- Minimum common indentation is stripped so the snippet is not over-indented.
- Multiple non-contiguous selections are each formatted individually and separated by a blank line.

---

### 4 · Copy Code with Line Numbers (Markdown Code Block)

Same as the command above, but wraps the output in a fenced Markdown code block:

````
```
 9: const parser = new Parser();
10: parser.load(input);
11: return parser.run();
```
````

Ready to paste directly into GitHub pull-request comments, issues, or any Markdown document.

---

## Keyboard Shortcuts

| Command | Windows / Linux | macOS |
|---|---|---|
| Copy Relative Path with Line Number(s) | `Ctrl+Alt+C` | `Cmd+Alt+C` |
| Copy Absolute Path with Line Number(s) | `Ctrl+Alt+A` | `Cmd+Alt+A` |
| Copy Code with Line Numbers | `Ctrl+Alt+L` | `Cmd+Alt+L` |
| Copy Code with Line Numbers (Markdown Code Block) | `Ctrl+Alt+M` | `Cmd+Alt+M` |

All commands are also available from the **editor right-click context menu** under the `9_copypath` group.

---

## Installation

You can install the extension from a `.vsix` file using either of the following methods:

### 1. From VS Code GUI
1. Download the latest `.vsix` release from the [Releases](https://github.com/wathsala-vishwajith/copy-path-with-line-numbers/releases) page.
2. Open VS Code and open the **Extensions** view (`Ctrl+Shift+X` or `Cmd+Shift+X`).
3. Click the **`···`** (Views and More Actions) menu at the top-right of the Extensions view.
4. Select **Install from VSIX...**.
5. Choose the downloaded `.vsix` file to install.

### 2. From the Command Line
Run the following command in your terminal:

```bash
code --install-extension <path-to-vsix-file>
```

---

## Requirements

- Visual Studio Code **1.125.0** or later.
- No external dependencies or runtime requirements.

---

## Extension Settings

This extension does not contribute any VS Code settings.

---

## Release Notes

See the full [CHANGELOG](CHANGELOG.md) for a detailed history.

### 0.0.4
Added **Copy Absolute Path with Line Number(s)** command — copies the absolute file path with line numbers, similar to the relative path command.
 
### 0.0.3
Added the **Copy Code with Line Numbers (Markdown Code Block)** command — wraps line-numbered code in a fenced ` ``` ` block.

### 0.0.2
Added the **Copy Code with Line Numbers** command with padded line numbers, multi-selection support, and indentation trimming. Also added extension icon and unit tests.

### 0.0.1
Initial release — **Copy Relative Path with Line Number(s)** command with multi-cursor support, deduplication, and status-bar feedback.

---

## Following Extension Guidelines

This extension follows the [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines).

---

**Enjoy!**
