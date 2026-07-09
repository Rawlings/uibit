import { LitElement, html, nothing } from 'lit';
import { customElement } from '@uibit/core';
import { property, state } from 'lit/decorators.js';
import { styles } from './styles';

export interface ClusterNode {
  id: string;
  label: string;
  icon?: string;
  badge?: string;
}

/**
 * Renders a flat cluster of infrastructure nodes, microservices, or inventory
 * items that explodes into an isometric 3D stack on hover or drag so individual
 * layers can be inspected and selected.
 *
 * Provide nodes as a JSON array via the `nodes` attribute or property. Each
 * node has an `id`, `label`, optional `icon` (emoji or short text), and
 * optional `badge` (count string).
 *
 * In the collapsed (flat) state the layers are stacked tightly to resemble a
 * unified block. On hover or pointer-down the stack tilts and layers spread
 * vertically — users can click individual layers to select them.
 *
 * @fires {{ node: ClusterNode }} node-select - Fired when a layer is clicked
 * @fires {{ id: string | null }} selection-change - Fired when selection changes (null = deselected)
 *
 * @cssprop [--uibit-isometric-cluster-width=100%] - Host width
 * @cssprop [--uibit-isometric-cluster-height=20rem] - Host height
 * @cssprop [--uibit-isometric-cluster-perspective=1200px] - 3D perspective distance
 * @cssprop [--uibit-isometric-cluster-transition=0.5s] - Expand/collapse transition duration
 * @cssprop [--uibit-isometric-cluster-layer-width=16rem] - Width of each layer card
 * @cssprop [--uibit-isometric-cluster-layer-height=3rem] - Height of each layer card
 * @cssprop [--uibit-isometric-cluster-layer-bg=#f3f4f6] - Layer card background
 * @cssprop [--uibit-isometric-cluster-layer-border=#e5e7eb] - Layer card border color
 * @cssprop [--uibit-isometric-cluster-layer-radius=0.375rem] - Layer card corner radius
 * @cssprop [--uibit-isometric-cluster-layer-active-bg=#ffffff] - Hovered/selected layer background
 * @cssprop [--uibit-isometric-cluster-layer-active-border=#9ca3af] - Hovered/selected layer border
 * @cssprop [--uibit-isometric-cluster-select-ring=#111827] - Focus/selection outline color
 * @cssprop [--uibit-isometric-cluster-font-family=inherit] - Font family
 * @cssprop [--uibit-isometric-cluster-font-size=0.8125rem] - Font size
 * @cssprop [--uibit-isometric-cluster-color=#111827] - Text color
 * @cssprop [--uibit-isometric-cluster-icon-bg=#e5e7eb] - Icon swatch background
 * @cssprop [--uibit-isometric-cluster-badge-bg=#f3f4f6] - Badge background
 * @cssprop [--uibit-isometric-cluster-badge-color=#6b7280] - Badge text color
 * @cssprop [--uibit-isometric-cluster-hint-color=#9ca3af] - Hint text color
 */
@customElement('uibit-isometric-cluster')
export class IsometricCluster extends LitElement {
  static styles = styles;

  /** JSON array of ClusterNode objects. */
  @property({
    type: Array,
    converter: {
      fromAttribute: (v: string | null) => {
        if (!v) return [];
        try { return JSON.parse(v); } catch { return []; }
      },
      toAttribute: (v: ClusterNode[]) => JSON.stringify(v),
    },
  }) nodes: ClusterNode[] = [];

  /** Gap in px between layers when expanded. */
  @property({ type: Number, attribute: 'layer-gap' }) layerGap = 56;

  /** X rotation applied to the stack when expanded (degrees). */
  @property({ type: Number, attribute: 'tilt-x' }) tiltX = 48;

  /** Y rotation applied to the stack when expanded (degrees). */
  @property({ type: Number, attribute: 'tilt-y' }) tiltY = -16;

  /** Allow drag to control tilt angle. */
  @property({ type: Boolean, attribute: 'drag-tilt' }) dragTilt = true;

  @state() private _expanded = false;
  @state() private _selectedId: string | null = null;
  @state() private _dragDeltaX = 0;
  @state() private _dragDeltaY = 0;

  private _dragStartX = 0;
  private _dragStartY = 0;
  private _dragging = false;

  private _onPointerEnter() {
    this._expanded = true;
    this.setAttribute('expanded', '');
  }

  private _onPointerLeave() {
    if (!this._dragging) {
      this._expanded = false;
      this.removeAttribute('expanded');
      this._dragDeltaX = 0;
      this._dragDeltaY = 0;
    }
  }

  private _onPointerDown(e: PointerEvent) {
    if (!this.dragTilt) return;
    this._dragging = true;
    this._dragStartX = e.clientX;
    this._dragStartY = e.clientY;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }

  private _onPointerMove(e: PointerEvent) {
    if (!this._dragging) return;
    this._dragDeltaX = e.clientX - this._dragStartX;
    this._dragDeltaY = e.clientY - this._dragStartY;
  }

  private _onPointerUp() {
    this._dragging = false;
    this._dragDeltaX = 0;
    this._dragDeltaY = 0;
  }

  private _onLayerClick(node: ClusterNode, e: Event) {
    e.stopPropagation();
    if (!this._expanded) return;
    const prev = this._selectedId;
    this._selectedId = prev === node.id ? null : node.id;
    this.dispatchEvent(new CustomEvent('selection-change', {
      detail: { id: this._selectedId },
      bubbles: true,
      composed: true,
    }));
    if (this._selectedId !== null) {
      this.dispatchEvent(new CustomEvent('node-select', {
        detail: { node },
        bubbles: true,
        composed: true,
      }));
    }
  }

  private _stackTransform() {
    if (!this._expanded) return 'rotateX(0deg) rotateY(0deg)';
    const rx = this.tiltX + this._dragDeltaY * 0.15;
    const ry = this.tiltY + this._dragDeltaX * 0.15;
    return `rotateX(${rx}deg) rotateY(${ry}deg)`;
  }

  render() {
    const total = this.nodes.length;
    const midOffset = ((total - 1) / 2) * this.layerGap;

    return html`
      <div
        class="scene"
        @pointerenter=${this._onPointerEnter}
        @pointerleave=${this._onPointerLeave}
        @pointerdown=${this._onPointerDown}
        @pointermove=${this._onPointerMove}
        @pointerup=${this._onPointerUp}
      >
        <div class="stack" style="transform:${this._stackTransform()}">
          ${this.nodes.map((node, i) => {
            const offset = this._expanded ? (i * this.layerGap - midOffset) : (i * 3 - (total - 1) * 1.5);
            return html`
              <div
                class="layer"
                role="option"
                aria-selected=${this._selectedId === node.id ? 'true' : 'false'}
                style="top:${offset}px; z-index:${total - i};"
                @click=${(e: Event) => this._onLayerClick(node, e)}
              >
                ${node.icon ? html`<span class="icon" aria-hidden="true">${node.icon}</span>` : nothing}
                <span class="label">${node.label}</span>
                ${node.badge ? html`<span class="badge">${node.badge}</span>` : nothing}
              </div>
            `;
          })}
        </div>
        ${!this._expanded ? html`<span class="hint">Hover to explore</span>` : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uibit-isometric-cluster': IsometricCluster;
  }
  namespace JSX {
    interface IntrinsicElements {
      'uibit-isometric-cluster': IsometricCluster;
    }
  }
}

export default IsometricCluster;
