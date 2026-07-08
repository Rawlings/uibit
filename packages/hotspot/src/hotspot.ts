import { LitElement, html } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import type { HotspotItem } from './types';
import { styles } from './styles';

/**
 * Interactive hotspot annotations for images. Display contextual tooltip
 * cards on click or hover with custom content overlays and animations.
 *
 * @fires {HotspotItem} hotspot-click - Fired when a hotspot trigger is activated
 *
 * @slot - Default slot for the background image or content
 * @slot popover-{id} - Custom content for the popover of a specific hotspot (by id)
 *
 * @cssprop [--uibit-hotspot-trigger-size=32px] - Width and height of the trigger button
 * @cssprop [--uibit-hotspot-trigger-bg=rgba(0,0,0,0.6)] - Background color of the trigger button
 * @cssprop [--uibit-hotspot-trigger-bg-hover=rgba(0,0,0,0.85)] - Background color of the trigger on hover/active
 * @cssprop [--uibit-hotspot-trigger-border=2px solid #ffffff] - Border of the trigger button
 * @cssprop [--uibit-hotspot-trigger-color=white] - Icon color inside the trigger button
 * @cssprop [--uibit-hotspot-focus-outline=0 0 0 3px #000000] - Box shadow used as focus outline on the trigger
 * @cssprop [--uibit-hotspot-focus-outline-color=#000000] - Color for the focus outline on the close button
 * @cssprop [--uibit-hotspot-popover-bg=rgba(255,255,255,0.95)] - Background of the popover card
 * @cssprop [--uibit-hotspot-popover-color=#111827] - Primary text color inside the popover
 * @cssprop [--uibit-hotspot-popover-content-color=#4b5563] - Secondary content text color inside the popover
 * @cssprop [--uibit-hotspot-popover-border-radius=12px] - Border radius of the popover card
 * @cssprop [--uibit-hotspot-popover-shadow=...] - Box shadow of the popover card
 * @cssprop [--uibit-hotspot-popover-border=1px solid rgba(0,0,0,0.1)] - Border of the popover card
 *
 * @csspart container - The root container wrapping image and all hotspots
 * @csspart wrapper - The positioning wrapper for each hotspot
 * @csspart trigger - The circular trigger button
 * @csspart trigger-active - Added to the trigger when the popover is open
 * @csspart popover - The popover card
 * @csspart popover-content - The content area inside the popover
 * @csspart popover-close - The close button inside the popover
 */
@customElement('uibit-hotspot')
export class Hotspot extends LitElement {
  static styles = styles;

  /** Array of hotspot items. Each item requires `id`, `x` (%), `y` (%), `label`, and optionally `title` and `content`. */
  @property({ type: Array }) hotspots: HotspotItem[] = [];
  /** When `false`, hotspots are rendered but not clickable or hoverable. */
  @property({ type: Boolean }) interactive = true;
  /** Interaction mode for showing the popover. */
  @property({ type: String }) trigger: 'click' | 'hover' = 'click';

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

  private handleTriggerClick(spot: HotspotItem, spotId: string, e: Event) {
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

  private onHotspotClick(spot: HotspotItem) {
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
      <div part="container" class="hotspot-container">
        <slot></slot>
        ${this.hotspots.map((spot, index) => {
          const spotId = spot.id || String(index);
          const isOpened = this.activeHotspotId === spotId;
          const positionClass = spot.y < 30 ? 'position-below' : 'position-above';

          return html`
            <div part="wrapper" class="hotspot-wrapper" style="left: ${spot.x}%; top: ${spot.y}%">
              <button
                part="trigger ${isOpened ? 'trigger-active' : ''}"
                class="hotspot-trigger ${isOpened ? 'active' : ''}"
                aria-label="${spot.label || spot.title || 'Hotspot'}"
                aria-expanded="${isOpened}"
                aria-controls="popover-${spotId}"
                ?disabled=${!this.interactive}
                @click=${(e: Event) => this.handleTriggerClick(spot, spotId, e)}
                @mouseenter=${() => this.handleTriggerMouseEnter(spotId)}
                @mouseleave=${() => this.handleTriggerMouseLeave()}
              ></button>

              ${isOpened
                ? html`
                    <div
                      id="popover-${spotId}"
                      part="popover"
                      class="hotspot-popover ${positionClass}"
                      role="dialog"
                      aria-modal="false"
                      aria-label="${spot.title || 'Hotspot details'}"
                      @mouseenter=${() => this.handlePopoverMouseEnter()}
                      @mouseleave=${() => this.handlePopoverMouseLeave()}
                    >
                      <div part="popover-content" class="popover-content">
                        <slot name="popover-${spotId}">
                          ${spot.title ? html`<h3>${spot.title}</h3>` : ''}
                          ${spot.content ? html`<p>${spot.content}</p>` : ''}
                        </slot>
                      </div>
                      <button
                        part="popover-close"
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

export default Hotspot;
