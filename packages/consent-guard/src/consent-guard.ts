import { LitElement, html, css } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';

@customElement('uibit-consent-guard')
export class ConsentGuard extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      --uibit-consent-guard-primary-color: #000000;
      --uibit-consent-guard-primary-hover-bg: #333333;
      --uibit-consent-guard-text-color: #1f2937;
      --uibit-consent-guard-muted-color: #6b7280;
      --uibit-consent-guard-border-color: #d1d5db;
      --uibit-consent-guard-bg: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
    }

    .consent-guard-container {
      width: 100%;
      position: relative;
    }

    .placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 16px;
      min-height: 300px;
      background: var(--uibit-consent-guard-bg);
      border: 1px solid var(--uibit-consent-guard-border-color);
      border-radius: 8px;
      padding: 32px 24px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .placeholder::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -50%;
      width: 200%;
      height: 200%;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(0, 0, 0, 0.03) 10px,
        rgba(0, 0, 0, 0.03) 20px
      );
      animation: shimmer 3s infinite;
      pointer-events: none;
    }

    @keyframes shimmer {
      0% {
        transform: translate(-50%, -50%) rotate(0deg);
      }
      100% {
        transform: translate(-50%, -50%) rotate(360deg);
      }
    }

    .placeholder-image {
      width: 80px;
      height: 80px;
      border-radius: 12px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      position: relative;
      z-index: 1;
      border: 1px solid var(--uibit-consent-guard-border-color);
    }

    .placeholder-icon {
      width: 40px;
      height: 40px;
      fill: var(--uibit-consent-guard-muted-color);
    }

    .placeholder-content {
      position: relative;
      z-index: 1;
    }

    .placeholder-title {
      font-size: 16px;
      font-weight: 600;
      color: var(--uibit-consent-guard-text-color);
      margin: 0;
      margin-bottom: 8px;
    }

    .placeholder-description {
      font-size: 14px;
      color: var(--uibit-consent-guard-muted-color);
      margin: 0;
      max-width: 320px;
      line-height: 1.5;
    }

    .consent-action {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
      margin-top: 16px;
    }

    .consent-button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 150ms ease;
      outline: none;
    }

    .consent-button:focus-visible {
      outline: 2px solid var(--uibit-consent-guard-primary-color);
      outline-offset: 2px;
    }

    .accept-button {
      background: var(--uibit-consent-guard-primary-color);
      color: white;
    }

    .accept-button:hover {
      background: var(--uibit-consent-guard-primary-hover-bg);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .accept-button:active {
      transform: translateY(0);
    }

    .decline-button {
      background: white;
      color: #4b5563;
      border: 1px solid var(--uibit-consent-guard-border-color);
    }

    .decline-button:hover {
      background: #f9fafb;
      border-color: #9ca3af;
    }

    .loaded-content {
      animation: fadeIn 300ms ease-out;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    .iframe-wrapper {
      width: 100%;
      border: none;
      border-radius: 8px;
      overflow: hidden;
    }
  `;

  @property({ type: String }) title = 'Third-party Content';
  @property({ type: String }) description = 'This content requires your consent to load. Click "Accept" to proceed.';
  @property({ type: String }) placeholderImage?: string;
  @property({ type: String }) src?: string;
  @property({ type: String }) contentType: 'iframe' | 'script' = 'iframe';
  @property({ type: Boolean }) autoHeight = true;
  @property({ type: Number }) height: number | string = 400;
  @property({ type: String }) acceptLabel = 'Accept Cookies';
  @property({ type: String }) declineLabel = 'Decline';

  @state() private isConsentGiven = false;
  @state() private scriptLoaded = false;

  private scriptElement?: HTMLScriptElement;
  private iframeElement?: HTMLIFrameElement;

  connectedCallback() {
    super.connectedCallback();
    this.checkConsentFromStorage();
  }

  private checkConsentFromStorage() {
    const consentKey = `consent-guard-${this.title}`;
    const stored = localStorage.getItem(consentKey);
    if (stored === 'true') {
      this.isConsentGiven = true;
      this.loadContent();
    }
  }

  private handleAccept() {
    this.isConsentGiven = true;
    const consentKey = `consent-guard-${this.title}`;
    localStorage.setItem(consentKey, 'true');
    this.loadContent();
    this.dispatchEvent(
      new CustomEvent('consent-accepted', {
        detail: { title: this.title },
        bubbles: true,
        composed: true
      })
    );
  }

  private handleDecline() {
    this.dispatchEvent(
      new CustomEvent('consent-declined', {
        detail: { title: this.title },
        bubbles: true,
        composed: true
      })
    );
  }

  private loadContent() {
    if (this.contentType === 'iframe') {
      this.loadIframe();
    } else if (this.contentType === 'script') {
      this.loadScript();
    }
  }

  private loadIframe() {
    if (!this.src || this.iframeElement) return;

    const container = this.shadowRoot?.querySelector('.consent-guard-container');
    if (!container) return;

    this.iframeElement = document.createElement('iframe');
    this.iframeElement.src = this.src;
    this.iframeElement.className = 'iframe-wrapper loaded-content';
    this.iframeElement.style.height = typeof this.height === 'number' ? `${this.height}px` : this.height as string;
    this.iframeElement.style.width = '100%';

    container.innerHTML = '';
    container.appendChild(this.iframeElement);
  }

  private loadScript() {
    if (this.scriptLoaded || !this.src) return;

    this.scriptLoaded = true;

    const container = this.shadowRoot?.querySelector('.consent-guard-container');
    if (!container) return;

    this.scriptElement = document.createElement('script');
    this.scriptElement.src = this.src;
    this.scriptElement.async = true;

    const wrapper = document.createElement('div');
    wrapper.className = 'loaded-content';
    wrapper.style.width = '100%';

    container.innerHTML = '';
    container.appendChild(wrapper);
    wrapper.appendChild(this.scriptElement);
  }

  private renderPlaceholder() {
    const hasCustomImage = !!this.placeholderImage;

    return html`
      <div class="placeholder" part="placeholder">
        <div class="placeholder-image" part="placeholder-image">
          ${hasCustomImage
            ? html`<img src="${this.placeholderImage}" alt="Placeholder" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;" />`
            : html`<svg class="placeholder-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>`}
        </div>
        <div class="placeholder-content" part="placeholder-content">
          <h3 class="placeholder-title" part="placeholder-title">
            <slot name="title">${this.title}</slot>
          </h3>
          <p class="placeholder-description" part="placeholder-description">
            <slot name="description">${this.description}</slot>
          </p>
        </div>
        <div class="consent-action" part="consent-actions">
          <slot name="actions">
            <button class="consent-button accept-button" part="accept-button" @click=${() => this.handleAccept()}>
              <slot name="accept-label">${this.acceptLabel}</slot>
            </button>
            <button class="consent-button decline-button" part="decline-button" @click=${() => this.handleDecline()}>
              <slot name="decline-label">${this.declineLabel}</slot>
            </button>
          </slot>
        </div>
      </div>
    `;
  }

  render() {
    return html`
      <div class="consent-guard-container">
        ${this.isConsentGiven ? '' : this.renderPlaceholder()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-consent-guard': ConsentGuard;
  }
}

export default ConsentGuard;
