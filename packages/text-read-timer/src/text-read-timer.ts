import { html } from 'lit';
import { customElement, fromLucide, getIcon, UIBitElement } from '@uibit/core';
import { Clock } from 'lucide';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Analyzes the word count of its slotted content and renders a reading-time
 * badge. The calculation happens inside the shadow DOM via a slot
 * change observer — no backend metadata required.
 *
 * Place your HTML content in the default slot. The component counts only text
 * nodes, ignoring markup and hidden elements.
 *
 * @slot - The content whose text will be measured
 * @slot timer - Optional named slot to position or override the read-time label/badge
 *
 * @cssprop [--uibit-text-read-timer-font-size=0.8125rem] - Badge font size
 * @cssprop [--uibit-text-read-timer-font-weight=500] - Badge font weight
 * @cssprop [--uibit-text-read-timer-color=#6b7280] - Badge text color
 * @cssprop [--uibit-text-read-timer-font-family=inherit] - Badge font family
 * @cssprop [--uibit-text-read-timer-gap=0.375rem] - Gap between icon and label
 * @cssprop [--uibit-text-read-timer-icon-size=0.875rem] - Size of the clock icon
 * @cssprop [--uibit-text-read-timer-icon-color=currentColor] - Color of the clock icon
 */
@customElement('uibit-text-read-timer')
export class TextReadTimer extends UIBitElement {
  static styles = styles;

  /** Average reading speed in words per minute. */
  @property({ type: Number, attribute: 'wpm' }) wpm = 238;
  /** Template for the label. Use `{time}` as a placeholder for the calculated duration. */
  @property({ type: String }) template = '{time} read';
  /** Show the clock icon before the label. */
  @property({ type: Boolean, attribute: 'show-icon' }) showIcon = true;

  @state() private _label = '';

  private _slot?: HTMLSlotElement;
  private _timerSlot?: HTMLSlotElement;

  firstUpdated() {
    this._slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement;
    this._slot?.addEventListener('slotchange', () => this._calculate());

    this._timerSlot = this.shadowRoot?.querySelector('slot[name="timer"]') as HTMLSlotElement;
    this._timerSlot?.addEventListener('slotchange', () => this._calculate());

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

    // Update any slotted elements inside slot="timer"
    if (this._timerSlot) {
      const assignedTimer = this._timerSlot.assignedElements({ flatten: true });
      for (const el of assignedTimer) {
        if (!el.textContent || el.textContent.trim() === '' || el.hasAttribute('data-auto-update')) {
          el.textContent = this._label;
          el.setAttribute('data-auto-update', '');
        }
      }
    }

    this.dispatchCustomEvent('read-time-change', { words, minutes });
  }

  private _extractText(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent || '';
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      // Skip the timer slot itself if it happens to be nested or queried
      if (el.getAttribute('slot') === 'timer') return '';
      
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

  render() {
    return html`
      <slot name="timer">
        <div class="timer" part="timer">
          ${this.showIcon ? html`<span class="icon" part="icon">${getIcon('clock', 14, fromLucide(Clock))}</span>` : ''}
          <span class="label" part="label">${this._label}</span>
        </div>
      </slot>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-text-read-timer': TextReadTimer;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-text-read-timer': TextReadTimer;
    }
  }
}

export default TextReadTimer;
