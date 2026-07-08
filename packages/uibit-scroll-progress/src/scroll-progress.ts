import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('uibit-scroll-progress')
export class ScrollProgress extends LitElement {
  static styles = css`
    :host {
      --progress-height: 4px;
      --progress-color: #3b82f6;
      --progress-bg: transparent;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: var(--progress-height);
      background: var(--progress-bg);
      z-index: 9999;
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

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('scroll', () => this.updateProgress());
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('scroll', () => this.updateProgress());
  }

  private updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    const progressBar = this.shadowRoot?.querySelector('.progress') as HTMLElement;
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  }

  render() {
    return html`<div class="progress"></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-scroll-progress': ScrollProgress;
  }
}

export default ScrollProgress;
