import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('uibit-scroll-progress')
export class ScrollProgress extends LitElement {
  static styles = css`
    :host {
      --progress-height: 4px;
      --progress-color: #3b82f6;
      --progress-bg: transparent;
      display: block;
      width: 100%;
      height: var(--progress-height);
      background: var(--progress-bg);
    }

    .progress {
      height: 100%;
      background: var(--progress-color);
      width: 0%;
      transition: width 150ms ease;
    }
  `;

  @property({ type: Number }) height = 4;
  @property({ type: String }) color = '#3b82f6';
  @property({ type: String }) target?: string; // CSS selector of custom scrollable element

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

    if (changedProperties.has('height') || changedProperties.has('color')) {
      this.updateStyles();
    }
  }

  private updateStyles() {
    this.style.setProperty('--progress-height', `${this.height}px`);
    this.style.setProperty('--progress-color', this.color);
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

declare global {
  interface HTMLElementTagNameMap {
    'uibit-scroll-progress': ScrollProgress;
  }
}

export default ScrollProgress;
