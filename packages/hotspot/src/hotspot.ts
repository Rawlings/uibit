import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

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

    .hotspot-wrapper {
      position: absolute;
      transform: translate(-50%, -50%);
      z-index: 10;
    }

    .hotspot-trigger {
      width: 32px;
      height: 32px;
      background: rgba(59, 130, 246, 0.6);
      border: 2px solid #ffffff;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
      position: relative;
      transition: transform 150ms ease, background-color 150ms ease;
      outline: none;
      padding: 0;
    }

    .hotspot-trigger::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: inherit;
      animation: pulse 2s infinite;
      z-index: -1;
      opacity: 0.6;
    }

    @keyframes pulse {
      0% {
        transform: scale(1);
        opacity: 0.6;
      }
      100% {
        transform: scale(2.2);
        opacity: 0;
      }
    }

    .hotspot-trigger:hover,
    .hotspot-trigger.active {
      background: rgba(59, 130, 246, 0.9);
      transform: scale(1.1);
    }

    .hotspot-trigger:focus-visible {
      box-shadow: 0 0 0 3px #3b82f6, 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .hotspot-trigger::after {
      content: '+';
      color: white;
      font-size: 18px;
      font-weight: bold;
      line-height: 1;
    }

    .hotspot-trigger.active::after {
      content: '×';
      font-size: 20px;
    }

    .hotspot-popover {
      position: absolute;
      width: 240px;
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      color: #1f2937;
      padding: 14px 16px;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.5);
      z-index: 20;
      display: flex;
      flex-direction: column;
      animation: fadeIn 200ms cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translate(-50%, 8px); }
      to { opacity: 1; transform: translate(-50%, 0); }
    }

    .hotspot-popover.position-above {
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
    }

    .hotspot-popover.position-below {
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
    }

    .hotspot-popover::after {
      content: '';
      position: absolute;
      border-style: solid;
      left: 50%;
      transform: translateX(-50%);
    }

    .hotspot-popover.position-above::after {
      top: 100%;
      border-width: 6px 6px 0 6px;
      border-color: rgba(255, 255, 255, 0.9) transparent transparent transparent;
    }

    .hotspot-popover.position-below::after {
      bottom: 100%;
      border-width: 0 6px 6px 6px;
      border-color: transparent transparent rgba(255, 255, 255, 0.9) transparent;
    }

    .popover-content h3 {
      margin: 0 0 6px 0;
      font-size: 15px;
      font-weight: 600;
      color: #111827;
    }

    .popover-content p {
      margin: 0;
      font-size: 13px;
      line-height: 1.4;
      color: #4b5563;
    }

    .popover-close {
      position: absolute;
      top: 8px;
      right: 8px;
      background: transparent;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      font-size: 16px;
      padding: 0;
      line-height: 1;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: background-color 150ms, color 150ms;
    }

    .popover-close:hover {
      background-color: rgba(0, 0, 0, 0.05);
      color: #4b5563;
    }

    .popover-close:focus-visible {
      outline: 2px solid #3b82f6;
    }
  `;

  @property({ type: Array }) hotspots: any[] = [];
  @property({ type: Boolean }) interactive = true;
  @property({ type: String }) trigger = 'click'; // 'click' | 'hover'

  @state() private activeHotspotId: string | null = null;

  private hoverTimeout?: number;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    document.addEventListener('click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('click', this.handleDocumentClick);
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
  }

  private handleDocumentKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.closePopover();
    }
  };

  private handleDocumentClick = (e: MouseEvent) => {
    if (this.trigger !== 'click') return;
    const path = e.composedPath();
    if (!path.includes(this)) {
      this.closePopover();
    }
  };

  private handleTriggerClick(spot: any, spotId: string, e: Event) {
    e.stopPropagation();
    if (!this.interactive) return;

    if (this.trigger === 'click') {
      if (this.activeHotspotId === spotId) {
        this.closePopover();
      } else {
        this.activeHotspotId = spotId;
      }
    }

    this.onHotspotClick(spot);
  }

  private handleTriggerMouseEnter(spotId: string) {
    if (!this.interactive || this.trigger !== 'hover') return;
    this.clearHoverTimeout();
    this.activeHotspotId = spotId;
  }

  private handleTriggerMouseLeave() {
    if (!this.interactive || this.trigger !== 'hover') return;
    this.scheduleClose();
  }

  private handlePopoverMouseEnter() {
    if (!this.interactive || this.trigger !== 'hover') return;
    this.clearHoverTimeout();
  }

  private handlePopoverMouseLeave() {
    if (!this.interactive || this.trigger !== 'hover') return;
    this.scheduleClose();
  }

  private scheduleClose() {
    this.clearHoverTimeout();
    this.hoverTimeout = window.setTimeout(() => {
      this.closePopover();
    }, 200);
  }

  private clearHoverTimeout() {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = undefined;
    }
  }

  private closePopover() {
    this.activeHotspotId = null;
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

  render() {
    return html`
      <div class="hotspot-container">
        <slot></slot>
        ${this.hotspots.map((spot, index) => {
          const spotId = spot.id || String(index);
          const isOpened = this.activeHotspotId === spotId;
          const positionClass = spot.y < 30 ? 'position-below' : 'position-above';

          return html`
            <div class="hotspot-wrapper" style="left: ${spot.x}%; top: ${spot.y}%">
              <button
                class="hotspot-trigger ${isOpened ? 'active' : ''}"
                aria-label="${spot.label || spot.title || 'Hotspot'}"
                aria-expanded="${isOpened}"
                aria-controls="popover-${spotId}"
                ?disabled=${!this.interactive}
                @click=${(e: Event) => this.handleTriggerClick(spot, spotId, e)}
                @mouseenter=${() => this.handleTriggerMouseEnter(spotId)}
                @mouseleave=${() => this.handleTriggerMouseLeave()}
              ></button>

              ${isOpened && (spot.title || spot.content)
                ? html`
                    <div
                      id="popover-${spotId}"
                      class="hotspot-popover ${positionClass}"
                      role="dialog"
                      aria-modal="false"
                      aria-label="${spot.title || 'Hotspot details'}"
                      @mouseenter=${() => this.handlePopoverMouseEnter()}
                      @mouseleave=${() => this.handlePopoverMouseLeave()}
                    >
                      <div class="popover-content">
                        ${spot.title ? html`<h3>${spot.title}</h3>` : ''}
                        ${spot.content ? html`<p>${spot.content}</p>` : ''}
                      </div>
                      <button
                        class="popover-close"
                        aria-label="Close details"
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          this.closePopover();
                        }}
                      >
                        &times;
                      </button>
                    </div>
                  `
                : ''}
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-hotspot': Hotspot;
  }
}

export default Hotspot;
