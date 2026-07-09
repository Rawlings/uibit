import { html, nothing } from 'lit';
import { customElement, UIBitElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';
import { diffLines } from './diff';
import type { DiffOp } from './diff';

/**
 * Side-by-side or inline comparison block for two blocks of text or code.
 * Computes a line-level diff internally using LCS — no external libraries needed.
 * Deleted lines are highlighted red, inserted lines green, in the familiar
 * code-review style.
 *
 * Supply the two texts via the `old` and `new` properties (or `old-text` /
 * `new-text` attributes for HTML usage). Switch between layouts with the
 * `mode` attribute.
 *
 * @cssprop [--uibit-diff-viewer-font-family=var(--uibit-font-mono)] - Code font stack
 * @cssprop [--uibit-diff-viewer-font-size=0.8125rem] - Font size
 * @cssprop [--uibit-diff-viewer-line-height=1.6] - Line height
 * @cssprop [--uibit-diff-viewer-border-color=var(--uibit-border-color)] - Border and divider color
 * @cssprop [--uibit-diff-viewer-radius=var(--uibit-radius-2xl)] - Corner radius
 * @cssprop [--uibit-diff-viewer-header-bg=var(--uibit-bg-subtle)] - Header background
 * @cssprop [--uibit-diff-viewer-label-color=var(--uibit-text-muted)] - Header label text color
 * @cssprop [--uibit-diff-viewer-gutter-bg=var(--uibit-bg-subtle)] - Line-number gutter background
 * @cssprop [--uibit-diff-viewer-gutter-color=var(--uibit-color-gray-400)] - Line-number gutter text color
 * @cssprop [--uibit-diff-viewer-delete-bg=#fef2f2] - Deleted-line background
 * @cssprop [--uibit-diff-viewer-delete-color=#991b1b] - Deleted-line text color
 * @cssprop [--uibit-diff-viewer-delete-gutter-bg=#fee2e2] - Deleted-line gutter background
 * @cssprop [--uibit-diff-viewer-insert-bg=#f0fdf4] - Inserted-line background
 * @cssprop [--uibit-diff-viewer-insert-color=#166534] - Inserted-line text color
 * @cssprop [--uibit-diff-viewer-insert-gutter-bg=#dcfce7] - Inserted-line gutter background
 * @cssprop [--uibit-diff-viewer-equal-color=var(--uibit-text-secondary)] - Unchanged-line text color
 */
@customElement('uibit-diff-viewer')
export class DiffViewer extends UIBitElement {
  static styles = styles;

  @state() private oldText = '';
  @state() private newText = '';

  /** Layout mode: 'split' shows two panes side by side, 'inline' shows a single unified view. */
  @property({ reflect: true }) mode: 'split' | 'inline' = 'split';

  connectedCallback() {
    super.connectedCallback();
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'region');
    }
    if (!this.hasAttribute('aria-label')) {
      this.setAttribute('aria-label', 'Code comparison');
    }
  }

  /** Show line numbers in the gutter. */
  @property({ type: Boolean, attribute: 'show-line-numbers' }) showLineNumbers = true;

  private _renderLine(type: 'equal' | 'insert' | 'delete', text: string, lineNum: number | null) {
    const sign = type === 'insert' ? '+' : type === 'delete' ? '-' : ' ';
    return html`
      <div class="line ${type}">
        ${this.showLineNumbers
          ? html`<span class="gutter">${lineNum ?? ''}</span>`
          : nothing}
        <span class="content"><span class="sign" aria-hidden="true">${sign}</span>${text}</span>
      </div>
    `;
  }

  private _renderSplit(ops: DiffOp[]) {
    let oldLine = 1;
    let newLine = 1;

    const leftLines: ReturnType<typeof html>[] = [];
    const rightLines: ReturnType<typeof html>[] = [];

    for (const op of ops) {
      if (op.type === 'equal') {
        leftLines.push(this._renderLine('equal', op.text, oldLine++));
        rightLines.push(this._renderLine('equal', op.text, newLine++));
      } else if (op.type === 'delete') {
        leftLines.push(this._renderLine('delete', op.text, oldLine++));
        rightLines.push(html`<div class="line equal"><span class="gutter"></span><span class="content"></span></div>`);
      } else {
        leftLines.push(html`<div class="line equal"><span class="gutter"></span><span class="content"></span></div>`);
        rightLines.push(this._renderLine('insert', op.text, newLine++));
      }
    }

    return html`
      <div class="header">
        <div class="header-cell"><slot name="old-label">Before</slot></div>
        <div class="header-cell"><slot name="new-label">After</slot></div>
      </div>
      <div class="body">
        <div class="pane">${leftLines}</div>
        <div class="pane">${rightLines}</div>
      </div>
    `;
  }

  private _renderInline(ops: DiffOp[]) {
    let oldLine = 1;
    let newLine = 1;

    const lines = ops.map(op => {
      if (op.type === 'equal') {
        return this._renderLine('equal', op.text, oldLine++);
      } else if (op.type === 'delete') {
        return this._renderLine('delete', op.text, oldLine++);
      } else {
        return this._renderLine('insert', op.text, newLine++);
      }
    });

    return html`
      <div class="header">
        <div class="header-cell"><slot name="old-label">Before</slot> → <slot name="new-label">After</slot></div>
      </div>
      <div class="body">
        <div class="pane">${lines}</div>
      </div>
    `;
  }

  private _handleOldChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    if (nodes.length > 0) {
      this.oldText = nodes.map(n => n.textContent ?? '').join('');
    }
  }

  private _handleNewChange(e: Event) {
    const slot = e.target as HTMLSlotElement;
    const nodes = slot.assignedNodes({ flatten: true });
    if (nodes.length > 0) {
      this.newText = nodes.map(n => n.textContent ?? '').join('');
    }
  }

  render() {
    const ops = diffLines(this.oldText, this.newText);
    return html`
      <slot name="old" @slotchange=${this._handleOldChange} style="display: none;"></slot>
      <slot name="new" @slotchange=${this._handleNewChange} style="display: none;"></slot>
      ${this.mode === 'split' ? this._renderSplit(ops) : this._renderInline(ops)}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-diff-viewer': DiffViewer;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-diff-viewer': DiffViewer;
    }
  }
}

export default DiffViewer;
