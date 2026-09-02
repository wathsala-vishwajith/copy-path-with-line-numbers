import * as assert from 'assert';
import * as vscode from 'vscode';
import { formatSelections } from '../extension';

suite('formatSelections', () => {
  test('single cursor, no selection', () => {
    const sel = new vscode.Selection(4, 0, 4, 0);
    assert.deepStrictEqual(formatSelections([sel]), ['5']);
  });

  test('single range', () => {
    const sel = new vscode.Selection(2, 0, 5, 10);
    assert.deepStrictEqual(formatSelections([sel]), ['3~6']);
  });

  test('multiple selections, sorted', () => {
    const a = new vscode.Selection(10, 0, 10, 0);
    const b = new vscode.Selection(1, 0, 3, 0);
    assert.deepStrictEqual(formatSelections([a, b]), ['2~3', '11']);
  });
});