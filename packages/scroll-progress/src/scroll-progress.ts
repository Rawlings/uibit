import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Thin progress bar that tracks scroll position — either the page or a
 * custom scrollable element — and fills as the user scrolls down.
 *
 * @cssprop [--uibit-scroll-progress-height=4px] - Height of the progress bar
 * @cssprop [--uibit-scroll-progress-bg=transparent] - Background (track) color
 * @cssprop [--uibit-scroll-progress-color=#000000] - Fill color of the progress indicator
 */
@customElement('uibit-scroll-progress')
export class ScrollProgress extends LitElement {
  static styles = styles;

  /** CSS selector of a custom scrollable container to track. Defaults to the page (`window`). */
  @property({ type: String }) target?: string;

  @state() private progressPercent = 0;

  private activeScrollTarget: HTMLElement | Window | null = null;
  private handleScroll = () => this.updateProgress();

  connectedCallback() {
    super.connectedCallback();
    this.attachScrollListener();
    this.updateProgress();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.detachScrollListener();
  }

  updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('target')) {
      this.attachScrollListener();
      this.updateProgress();
    }
  }

  private getTargetElement(): HTMLElement | Window {
    if (typeof window === 'undefined') return window;
    if (this.target) {
      const el = document.querySelector(this.target);
      if (el) return el as HTMLElement;
    }
    return window;
  }

  private attachScrollListener() {
    this.detachScrollListener();
    const targetEl = this.getTargetElement();
    this.activeScrollTarget = targetEl;
    targetEl.addEventListener('scroll', this.handleScroll);
  }

  private detachScrollListener() {
    if (this.activeScrollTarget) {
      this.activeScrollTarget.removeEventListener('scroll', this.handleScroll);
      this.activeScrollTarget = null;
    }
  }

  private updateProgress() {
    let scrollTop = 0;
    let docHeight = 0;

    if (this.activeScrollTarget === window || !this.activeScrollTarget) {
      if (typeof window !== 'undefined') {
        scrollTop = window.scrollY;
        docHeight = document.documentElement.scrollHeight - window.innerHeight;
      }
    } else {
      const el = this.activeScrollTarget as HTMLElement;
      scrollTop = el.scrollTop;
      docHeight = el.scrollHeight - el.clientHeight;
    }

    this.progressPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  render() {
    return html`
      <div 
        part="progress"
        class="progress" 
        style="width: ${this.progressPercent}%"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="${Math.round(this.progressPercent)}"
        aria-label="Scroll progress indicator"
      ></div>
    `;
  }
}

export default ScrollProgress;
