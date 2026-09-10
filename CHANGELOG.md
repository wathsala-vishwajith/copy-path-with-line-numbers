# Change Log

All notable changes to the "copy-path-with-line-numbers" extension will be documented in this file.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.0.4] – 2026-09-10

- Added **Copy Absolute Path with Line Number(s)** command (`copyRelativePathWithLines.copyAbsolute`)  
  Copies the absolute file path followed by the current cursor line or selection range(s) in the format `/absolute/path/to/file.ts:5` or `/absolute/path/to/file.ts:3-6,11`.  
  - Supports multiple, non-contiguous selections (multi-cursor).  
  - Duplicate and overlapping ranges are deduplicated and sorted.  
  - Edge case: a selection that ends exactly at column 0 of the next line does not include that trailing line in the range.

## [0.0.3] – 2026-09-06

### Added
- **Copy Code with Line Numbers (Markdown Code Block)** command (`copyRelativePathWithLines.copyWithLineNumbersCodeBlock`)  
  Wraps the padded, line-numbered code output in a fenced Markdown code block (` ``` `), ready to paste into GitHub comments, pull-request reviews, or any Markdown document.
- Keyboard shortcut `Ctrl+Alt+M` / `Cmd+Alt+M` for the new code-block command.
- Context-menu entry for the code-block command (group `9_copypath@3`).

---

## [0.0.2] – 2026-09-06

### Added
- **Copy Code with Line Numbers** command (`copyRelativePathWithLines.copyWithLineNumbers`)  
  Copies selected code to the clipboard with left-padded line numbers prepended to every line, preserving relative indentation.  
  - Supports multiple, non-contiguous selections — each block is separated by a blank line.  
  - Line numbers are right-aligned and padded to the width of the largest line number in the selection.  
  - Minimum common indentation is stripped so that the copied snippet is not over-indented.
- Keyboard shortcut `Ctrl+Alt+L` / `Cmd+Alt+L` for the copy-code command.
- Context-menu entry for the copy-code command (group `9_copypath@2`).
- Extension icon (`icons/icon.png`).
- Unit tests for `formatSelections` and `formatSelectionsForCopy`.

---

## [0.0.1] – 2026-09-03

### Added
- Initial release.
- **Copy Relative Path with Line Number(s)** command (`copyRelativePathWithLines.copy`)  
  Copies the workspace-relative file path followed by the current cursor line or selection range(s) in the format `path/to/file.ts:5` or `path/to/file.ts:3-6,11`.  
  - Supports multiple, non-contiguous selections (multi-cursor).  
  - Duplicate and overlapping ranges are deduplicated and sorted.  
  - Edge case: a selection that ends exactly at column 0 of the next line does not include that trailing line in the range.
- Keyboard shortcut `Ctrl+Alt+C` / `Cmd+Alt+C` for the copy-path command.
- Context-menu entry for the copy-path command under the editor context menu (group `9_copypath@1`).
- Status-bar confirmation message ("Copied to clipboard!") displayed for 3 seconds after each copy action.