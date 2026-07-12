import { html } from 'lit';
import { customElement, fromLucide, getIcon, msg, UIBitElement } from '@uibit/core';
import { Plus, X } from 'lucide';
import { property, state } from 'lit/decorators.js';
import type { HotspotItem } from './types';
import { styles } from './styles';

/**
 * Interactive hotspot annotations for images. Display contextual tooltip

 * @summary An interactive image hotspot component with animated markers and popovers.
 * cards on click or hover with custom content overlays and animations.
 *
 * @fires {HotspotItem} hotspot-click - Fired when a hotspot trigger is activated
 *
 * @slot - Default slot for the background image or content
 * @slot popover-{id} - Custom content for the popover of a specific hotspot (by id)
 *
 * @cssprop [--uibit-hotspot-trigger-size=2rem] - Width and height of the trigger button
 * @cssprop [--uibit-hotspot-trigger-bg=rgba(0,0,0,0.65)] - Background color of the trigger button
 * @cssprop [--uibit-hotspot-trigger-bg-hover=rgba(0,0,0,0.9)] - Background color of the trigger on hover/active
 * @cssprop [--uibit-hotspot-trigger-border=0.125rem solid #ffffff] - Border of the trigger button
 * @cssprop [--uibit-hotspot-trigger-color=#ffffff] - Icon color inside the trigger button
 * @cssprop [--uibit-hotspot-popover-bg=rgba(255,255,255,0.96)] - Background of the popover card
 * @cssprop [--uibit-hotspot-popover-color=#111827] - Primary text color inside the popover
 * @cssprop [--uibit-hotspot-popover-content-color=#4b5563] - Secondary content text color inside the popover
 * @cssprop [--uibit-hotspot-popover-border-radius=0.75rem] - Border radius of the popover card
 * @cssprop [--uibit-hotspot-popover-shadow=0 0.625rem 1.5rem rgba(0,0,0,0.1)] - Box shadow of the popover card
 * @cssprop [--uibit-hotspot-popover-border=0.0625rem solid rgba(0,0,0,0.08)] - Border of the popover card
 *
 * @csspart container - The root container wrapping image and all hotspots
 * @csspart wrapper - The positioning wrapper for each hotspot
 * @csspart trigger - The circular trigger button
 * @csspart trigger-active - Added to the trigger when the popover is open
 * @csspart popover - The popover card
 * @csspart popover-content - The content area inside the popover
 * @csspart popover-close - The close button inside the popover
 
 * @cssstate active - Active when the hotspot popover is expanded.*/
@customElement('uibit-hotspot')
export class Hotspot extends UIBitElement {
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
    this.listen(document, 'keydown', this.handleDocumentKeyDown);
    this.listen(document, 'click', this.handleDocumentClick);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
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
    this.dispatchCustomEvent('hotspot-click', spot);
  }

  render() {
    return html`
      <div part="container" class="hotspot-container">
        <slot></slot>
        ${this.hotspots.map((spot, index) => {
          const spotId = spot.id || String(index);
          const isOpened = this.activeHotspotId === spotId;
          
          const yVal = typeof spot.y === 'number' ? spot.y : parseFloat(String(spot.y || '0'));
          const positionClass = yVal < 30 ? 'position-below' : 'position-above';

          const leftStyle = typeof spot.x === 'number' ? `${spot.x}%` : (String(spot.x).endsWith('%') ? spot.x : `${spot.x}%`);
          const topStyle = typeof spot.y === 'number' ? `${spot.y}%` : (String(spot.y).endsWith('%') ? spot.y : `${spot.y}%`);

          return html`
            <div part="wrapper" class="hotspot-wrapper" style="left: ${leftStyle}; top: ${topStyle}">
              <button
                part="trigger ${isOpened ? 'trigger-active' : ''}"
                class="hotspot-trigger ${isOpened ? 'active' : ''}"
                aria-label="${spot.label || spot.title || msg('Hotspot')}"
                aria-expanded="${isOpened}"
                aria-controls="popover-${spotId}"
                ?disabled=${!this.interactive}
                @click=${(e: Event) => this.handleTriggerClick(spot, spotId, e)}
                @mouseenter=${() => this.handleTriggerMouseEnter(spotId)}
                @mouseleave=${() => this.handleTriggerMouseLeave()}
              >${isOpened ? getIcon('x', 14, fromLucide(X)) : getIcon('plus', 14, fromLucide(Plus))}</button>

              ${isOpened
                ? html`
                    <div
                      id="popover-${spotId}"
                      part="popover"
                      class="hotspot-popover ${positionClass}"
                      role="dialog"
                      aria-modal="false"
                      aria-label="${spot.title || msg('Hotspot details')}"
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
                        aria-label=${msg('Close details')}
                        @click=${(e: Event) => {
                          e.stopPropagation();
                          this.closePopover();
                        }}
                      >${getIcon('x', 14, fromLucide(X))}</button>
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
