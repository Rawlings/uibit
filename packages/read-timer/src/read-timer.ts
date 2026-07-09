import { LitElement, html, svg } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Analyzes the word count of its slotted content and renders a reading-time
 * badge inline. The calculation happens inside the shadow DOM via a slot
 * change observer — no backend metadata required.
 *
 * Place any HTML content in the default slot. The component counts only text
 * nodes, ignoring markup and hidden elements.
 *
 * @slot - The content whose text will be measured
 *
 * @cssprop [--uibit-read-timer-font-size=0.8125rem] - Badge font size
 * @cssprop [--uibit-read-timer-font-weight=500] - Badge font weight
 * @cssprop [--uibit-read-timer-color=#6b7280] - Badge text color
 * @cssprop [--uibit-read-timer-font-family=inherit] - Badge font family
 * @cssprop [--uibit-read-timer-gap=0.375rem] - Gap between icon and label
 * @cssprop [--uibit-read-timer-icon-size=0.875rem] - Size of the clock icon
 * @cssprop [--uibit-read-timer-icon-color=currentColor] - Color of the clock icon
 */
@customElement('uibit-read-timer')
export class ReadTimer extends LitElement {
  static styles = styles;

  /** Average reading speed in words per minute. */
  @property({ type: Number, attribute: 'wpm' }) wpm = 238;
  /** Template for the label. Use `{time}` as a placeholder for the calculated duration. */
  @property({ type: String }) template = '{time} read';
  /** Show the clock icon before the label. */
  @property({ type: Boolean, attribute: 'show-icon' }) showIcon = true;

  @state() private _label = '';

  private _slot?: HTMLSlotElement;

  firstUpdated() {
    this._slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    this._slot?.addEventListener('slotchange', () => this._calculate());
    this._calculate();
  }

  private _calculate() {
    if (!this._slot) return;
    const assigned = this._slot.assignedNodes({ flatten: true });
    let text = '';
    for (const node of assigned) {
      text += this._extractText(node);
    }
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.ceil(words / this.wpm);
    const timeStr = minutes < 1 ? 'less than 1 min' : `${minutes} min`;
    this._label = this.template.replace('{time}', timeStr);
    this.dispatchEvent(new CustomEvent('read-time-change', {
      detail: { words, minutes },
      bubbles: true,
      composed: true,
    }));
  }

  private _extractText(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const style = window.getComputedStyle(el as HTMLElement);
      if (style.display === 'none' || style.visibility === 'hidden') return '';
      let t = '';
      for (const child of Array.from(el.childNodes)) {
        t += this._extractText(child);
      }
      return t;
    }
    return '';
  }

  private _clockIcon() {
    return svg`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    `;
  }

  render() {
    return html`
      <div class="content-slot">
        <slot></slot>
      </div>
      <slot name="icon">
        ${this.showIcon ? html`<span class="icon" part="icon">${this._clockIcon()}</span>` : ''}
      </slot>
      <span class="label" part="label">${this._label}</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-read-timer': ReadTimer;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-read-timer': ReadTimer;
    }
  }
}

export default ReadTimer;
