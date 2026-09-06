import * as assert from 'assert';
import * as vscode from 'vscode';
import { formatSelections, formatSelectionsForCopy } from '../extension';

suite('formatSelections', () => {
  test('single cursor, no selection', () => {
    const sel = new vscode.Selection(4, 0, 4, 0);
    assert.deepStrictEqual(formatSelections([sel]), ['5']);
  });

  test('single range', () => {
    const sel = new vscode.Selection(2, 0, 5, 10);
    assert.deepStrictEqual(formatSelections([sel]), ['3-6']);
  });

  test('multiple selections, sorted', () => {
    const a = new vscode.Selection(10, 0, 10, 0);
    const b = new vscode.Selection(1, 0, 3, 0);
    assert.deepStrictEqual(formatSelections([a, b]), ['2-3', '11']);
  });
});

suite('formatLinesWithNumbers', () => {

  test('single line, no padding needed', () => {
    const result = formatSelectionsForCopy([
      { lineNumber: 5, text: 'hello world' }
    ]);
    assert.strictEqual(result, '5 hello world');
  });

  test('multi-line pads to widest number', () => {
    const result = formatSelectionsForCopy([
      { lineNumber: 9,  text: 'aaa' },
      { lineNumber: 10, text: 'bbb' },
    ]);
    // lineNumber 9 should be padded to width 2 to match "10"
    assert.strictEqual(result, ' 9 aaa\n10 bbb');
  });

  test('preserves leading whitespace (indentation)', () => {
    const result = formatSelectionsForCopy([
      { lineNumber: 1, text: '    indented line' }
    ]);
    assert.strictEqual(result, '1     indented line');
  });

  test('empty array returns empty string', () => {
    assert.strictEqual(formatSelectionsForCopy([]), '');
  });

  test('4-digit line number padding', () => {
    const result = formatSelectionsForCopy([
      { lineNumber: 998,  text: 'a' },
      { lineNumber: 999,  text: 'b' },
      { lineNumber: 1000, text: 'c' },
    ]);
    assert.strictEqual(result, ' 998 a\n 999 b\n1000 c');
  });
});