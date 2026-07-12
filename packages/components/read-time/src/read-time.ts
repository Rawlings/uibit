import { html } from 'lit';
import { customElement, fromLucide, getIcon, UIBitElement, msg, str } from '@uibit/core';
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
 * @cssprop [--uibit-read-time-font-size=0.8125rem] - Badge font size
 * @cssprop [--uibit-read-time-font-weight=500] - Badge font weight
 * @cssprop [--uibit-read-time-color=#6b7280] - Badge text color
 * @cssprop [--uibit-read-time-font-family=inherit] - Badge font family
 * @cssprop [--uibit-read-time-gap=0.375rem] - Gap between icon and label
 * @cssprop [--uibit-read-time-icon-size=0.875rem] - Size of the clock icon
 * @cssprop [--uibit-read-time-icon-color=currentColor] - Color of the clock icon
 */
@customElement('uibit-read-time')
export class ReadTime extends UIBitElement {
  static styles = styles;

  /** Average reading speed in words per minute. */
  @property({ type: Number, attribute: 'wpm' }) wpm = 238;
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
    
    const timeStr = minutes < 1 ? msg('less than 1 min') : msg(str`${minutes} min`);
    const defaultLabel = minutes < 1 ? msg('Less than 1 min read') : msg(str`${minutes} min read`);
    this._label = defaultLabel;

    // Update any slotted elements inside slot="timer"
    if (this._timerSlot) {
      const assignedTimer = this._timerSlot.assignedElements({ flatten: true });
      for (const el of assignedTimer) {
        let template = el.getAttribute('data-template');
        if (template === null) {
          const rawText = el.textContent || '';
          if (rawText.includes('{time}')) {
            template = rawText;
            el.setAttribute('data-template', template);
          } else {
            template = '';
            el.setAttribute('data-template', '');
          }
        }

        if (template) {
          el.textContent = template.replace('{time}', timeStr);
        } else if (!el.textContent || el.textContent.trim() === '' || el.hasAttribute('data-auto-update')) {
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

export default ReadTime;

