import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('uibit-360-viewer')
export class Viewer360 extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .viewer {
      position: relative;
      width: 100%;
      overflow: hidden;
      background: #f5f5f5;
      border-radius: 8px;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  `;

  @property({ type: Array }) images: string[] = [];
  @property({ type: Boolean }) autoRotate = false;
  @property({ type: Number }) rotationSpeed = 100;

  private currentIndex = 0;

  render() {
    const image = this.images[this.currentIndex];

    return html`
      <div class="viewer">
        ${image ? html`<img src="${image}" alt="360 view" />` : html`<p>No images provided</p>`}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-360-viewer': Viewer360;
  }
}

export default Viewer360;
