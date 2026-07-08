import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('uibit-hotspot')
export class Hotspot extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
    }

    .hotspot-container {
      position: relative;
      width: 100%;
    }

    .hotspot-trigger {
      position: absolute;
      width: 40px;
      height: 40px;
      transform: translate(-50%, -50%);
      background: rgba(59, 130, 246, 0.2);
      border: 2px solid #3b82f6;
      border-radius: 50%;
      cursor: pointer;
      transition: all 150ms ease;
    }

    .hotspot-trigger:hover {
      background: rgba(59, 130, 246, 0.3);
      transform: translate(-50%, -50%) scale(1.1);
    }

    .hotspot-trigger:focus-visible {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
  `;

  @property({ type: Array }) hotspots: any[] = [];
  @property({ type: Boolean }) interactive = true;

  render() {
    return html`
      <div class="hotspot-container">
        <slot></slot>
        ${this.hotspots.map(
          (spot) => html`
            <button
              class="hotspot-trigger"
              style="left: ${spot.x}%; top: ${spot.y}%"
              aria-label="${spot.label}"
              @click=${() => this.onHotspotClick(spot)}
            ></button>
          `
        )}
      </div>
    `;
  }

  private onHotspotClick(spot: any) {
    this.dispatchEvent(
      new CustomEvent('hotspot-click', {
        detail: spot,
        bubbles: true,
        composed: true
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-hotspot': Hotspot;
  }
}

export default Hotspot;
