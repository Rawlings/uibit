import { LitElement, html, css } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';

/**
 * Gate third-party iframes or scripts behind a consent prompt. Shows a
 * placeholder with an accept/decline action until the user grants consent.
 *
 * @fires void consent-accepted - Fired when the user clicks the accept button
 * @fires void consent-declined - Fired when the user clicks the decline button
 *
 * @slot title - Overrides the placeholder heading text
 * @slot description - Overrides the placeholder description text
 * @slot actions - Replaces the entire accept/decline action area
 * @slot accept-label - Overrides the label text on the accept button
 * @slot decline-label - Overrides the label text on the decline button
 *
 * @cssprop [--uibit-consent-guard-primary-color=#000000] - Accent color used for the accept button background
 * @cssprop [--uibit-consent-guard-primary-hover-bg=#1f2937] - Hover background of the accept button
 * @cssprop [--uibit-consent-guard-text-color=#111827] - Primary text color
 * @cssprop [--uibit-consent-guard-muted-color=#6b7280] - Muted/secondary text color
 * @cssprop [--uibit-consent-guard-border-color=#e5e7eb] - Border color of the placeholder and buttons
 * @cssprop [--uibit-consent-guard-bg=#f9fafb] - Background of the placeholder area
 *
 * @csspart placeholder - The pre-consent placeholder container
 * @csspart placeholder-image - The image/icon area inside the placeholder
 * @csspart placeholder-content - The text content area inside the placeholder
 * @csspart placeholder-title - The heading inside the placeholder
 * @csspart placeholder-description - The description inside the placeholder
 * @csspart consent-actions - The action button container
 * @csspart accept-button - The accept button
 * @csspart decline-button - The decline button
 */
@customElement('uibit-consent-guard')
export class ConsentGuard extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      --uibit-consent-guard-primary-color: #000000;
      --uibit-consent-guard-primary-hover-bg: #1f2937;
      --uibit-consent-guard-text-color: #111827;
      --uibit-consent-guard-muted-color: #6b7280;
      --uibit-consent-guard-border-color: #e5e7eb;
      --uibit-consent-guard-bg: #f9fafb;
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
      gap: 1rem;
      min-height: 18.75rem;
      background: var(--uibit-consent-guard-bg);
      border: 0.0625rem solid var(--uibit-consent-guard-border-color);
      border-radius: 0.5rem;
      padding: 2rem 1.5rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .placeholder-image {
      width: 5rem;
      height: 5rem;
      border-radius: 0.75rem;
      background: #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0.125rem 0.5rem rgba(0, 0, 0, 0.06);
      position: relative;
      z-index: 1;
      border: 0.0625rem solid var(--uibit-consent-guard-border-color);
    }

    .placeholder-icon {
      width: 2.5rem;
      height: 2.5rem;
      fill: var(--uibit-consent-guard-muted-color);
    }

    .placeholder-content {
      position: relative;
      z-index: 1;
    }

    .placeholder-title {
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: var(--uibit-consent-guard-text-color);
      margin: 0;
      margin-bottom: 0.5rem;
    }

    .placeholder-description {
      font-size: 0.875rem;
      color: var(--uibit-consent-guard-muted-color);
      margin: 0;
      max-width: 20rem;
      line-height: 1.6;
    }

    .consent-action {
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      flex-wrap: wrap;
      position: relative;
      z-index: 1;
      margin-top: 1rem;
    }

    .consent-button {
      padding: 0.625rem 1.25rem;
      border: none;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
      outline: none;
    }

    .consent-button:focus-visible {
      outline: 0.125rem solid var(--uibit-consent-guard-primary-color);
      outline-offset: 0.125rem;
    }

    .accept-button {
      background: var(--uibit-consent-guard-primary-color);
      color: #ffffff;
    }

    .accept-button:hover {
      background: var(--uibit-consent-guard-primary-hover-bg);
      transform: translateY(-0.0625rem);
      box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
    }

    .accept-button:active {
      transform: translateY(0);
    }

    .decline-button {
      background: #ffffff;
      color: #374151;
      border: 0.0625rem solid var(--uibit-consent-guard-border-color);
    }

    .decline-button:hover {
      background: #f3f4f6;
      border-color: #9ca3af;
    }

    .loaded-content {
      opacity: 1;
    }

    .iframe-wrapper {
      width: 100%;
      border: none;
      border-radius: 0.5rem;
      overflow: hidden;
    }
  `;

  /** Heading text shown in the placeholder before consent is given. */
  @property({ type: String }) title = 'Third-party Content';
  /** Description text shown in the placeholder before consent is given. */
  @property({ type: String }) description = 'This content requires your consent to load. Click "Accept" to proceed.';
  /** URL of an image to display as the placeholder background before consent. */
  @property({ type: String }) placeholderImage?: string;
  /** URL of the iframe or script to load after consent is granted. */
  @property({ type: String }) src?: string;
  /** Whether to load an `iframe` or inject a `script` tag after consent. */
  @property({ type: String }) contentType: 'iframe' | 'script' = 'iframe';
  /** Automatically set the iframe height to match its content. */
  @property({ type: Boolean }) autoHeight = true;
  /** Explicit height (px or CSS string) when `autoHeight` is `false`. */
  @property({ type: Number }) height: number | string = 400;
  /** Label for the accept/consent button. */
  @property({ type: String }) acceptLabel = 'Accept Cookies';
  /** Label for the decline button. */
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
  namespace JSX {
    interface IntrinsicElements {
      'uibit-consent-guard': ConsentGuard;
    }
  }
}

export default ConsentGuard;
