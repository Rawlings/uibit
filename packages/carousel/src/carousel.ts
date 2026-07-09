import { html } from 'lit';
import { customElement, getIcon, msg, str, UIBitElement } from '@uibit/core';
import { property, query, state } from 'lit/decorators.js';
import type { CarouselConfig } from './types';
import { styles } from './styles';

/**
 * Accessible, scroll-driven carousel with keyboard navigation, auto-play,
 * and configurable items-per-view via CSS custom properties.
 *
 * @fires {{ index: number, totalSlides: number }} slide-change - Fired when the active slide changes
 *
 * @slot item - One or more slide elements (add `slot="item"` to each child)
 *
 * @cssprop [--uibit-carousel-gap=1rem] - Gap between slides
 * @cssprop [--uibit-carousel-duration=300ms] - Scroll animation duration
 * @cssprop [--uibit-carousel-items-per-view=1] - Number of slides visible at once
 * @cssprop [--uibit-carousel-border-color=#e5e7eb] - Border color of the viewport
 * @cssprop [--uibit-carousel-button-bg=#f9fafb] - Background of prev/next buttons
 * @cssprop [--uibit-carousel-button-bg-hover=#f3f4f6] - Hover background of prev/next buttons
 * @cssprop [--uibit-carousel-indicator-bg=#e5e7eb] - Background of inactive indicator dots
 * @cssprop [--uibit-carousel-indicator-active-bg=#000000] - Background of the active indicator dot
 * @cssprop [--uibit-carousel-focus-color=#000000] - Color of the focus outline on buttons
 *
 * @csspart carousel - The root carousel container
 * @csspart viewport - The overflow-hidden viewport
 * @csspart content - The scrollable slides row
 * @csspart controls - The control bar below the viewport
 * @csspart buttons - The prev/next button group
 * @csspart button - Each navigation button
 * @csspart button-prev - The previous slide button
 * @csspart button-next - The next slide button
 * @csspart indicators - The indicator dot group
 * @csspart indicator - Each indicator dot
 * @csspart indicator-active - Added to the active indicator dot
 */
@customElement('uibit-carousel')
export class UIBitCarousel extends UIBitElement {
  static styles = styles;

  /** Automatically advance slides on a timer. */
  @property({ type: Boolean }) autoPlay = false;
  /** Milliseconds between auto-play advances. */
  @property({ type: Number }) autoPlayInterval = 5000;
  /** When `true`, the carousel wraps from the last slide back to the first. */
  @property({ type: Boolean }) loop = true;

  get itemsPerView(): number {
    if (typeof window === 'undefined') return 1;
    const val = this.getCssPropertyValue('--uibit-carousel-items-per-view');
    return val ? parseFloat(val) || 1 : 1;
  }

  get gap(): number {
    if (typeof window === 'undefined') return 16;
    const val = this.getCssPropertyValue('--uibit-carousel-gap');
    return val ? parseFloat(val) ?? 16 : 16;
  }

  get duration(): number {
    if (typeof window === 'undefined') return 300;
    const val = this.getCssPropertyValue('--uibit-carousel-duration');
    if (!val) return 300;
    if (val.endsWith('ms')) return parseFloat(val) || 300;
    if (val.endsWith('s')) return (parseFloat(val) * 1000) || 300;
    return parseFloat(val) || 300;
  }

  @query('.carousel-content') content?: HTMLElement;
  @query('.carousel-viewport') viewport?: HTMLElement;
  @query('slot[name="item"]') slotElement?: HTMLSlotElement;

  @state() currentIndex = 0;
  @state() totalSlides = 0;
  @state() canPrev = false;
  @state() canNext = true;

  private autoPlayTimer?: number;
  private resizeObserver?: ResizeObserver;
  private slideObserver?: IntersectionObserver;
  private slideIntersectionRatios = new Map<Element, number>();
  private isProgrammaticScroll = false;
  private programmaticScrollTimeout?: number;
  private isPausedByInteraction = false;

  private handlePointerEnter = () => {
    this.isPausedByInteraction = true;
    this.stopAutoPlay();
  };

  private handlePointerLeave = () => {
    this.isPausedByInteraction = false;
    if (this.autoPlay) {
      this.setupAutoPlay();
    }
  };

  private handleFocusIn = () => {
    this.isPausedByInteraction = true;
    this.stopAutoPlay();
  };

  private handleFocusOut = () => {
    this.isPausedByInteraction = false;
    if (this.autoPlay) {
      this.setupAutoPlay();
    }
  };

  constructor(config?: CarouselConfig) {
    super();
    if (config) {
      this.autoPlay = config.autoPlay ?? this.autoPlay;
      this.autoPlayInterval = config.autoPlayInterval ?? this.autoPlayInterval;
      this.loop = config.loop ?? this.loop;
      if (config.itemsPerView !== undefined) {
        this.style.setProperty('--uibit-carousel-items-per-view', String(config.itemsPerView));
      }
      if (config.gap !== undefined) {
        this.style.setProperty('--uibit-carousel-gap', typeof config.gap === 'number' ? `${config.gap}px` : config.gap);
      }
      if (config.duration !== undefined) {
        this.style.setProperty('--uibit-carousel-duration', typeof config.duration === 'number' ? `${config.duration}ms` : config.duration);
      }
    }
  }

  protected firstUpdated() {
    this.setupCarousel();
    this.setupAutoPlay();
    this.setupKeyboardNavigation();

    this.listen(this, 'pointerenter', this.handlePointerEnter);
    this.listen(this, 'pointerleave', this.handlePointerLeave);
    this.listen(this, 'focusin', this.handleFocusIn);
    this.listen(this, 'focusout', this.handleFocusOut);
  }

  updated(changedProperties: Map<string, unknown>) {
    if (
      changedProperties.has('autoPlay') ||
      changedProperties.has('autoPlayInterval')
    ) {
      if (this.autoPlay) {
        this.setupAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stopAutoPlay();
    if (this.programmaticScrollTimeout) {
      clearTimeout(this.programmaticScrollTimeout);
    }
  }

  private setupCarousel() {
    if (!this.content) return;

    const items = this.getSlides();
    this.totalSlides = items.length;

    // Decorate slotted elements with accessibility attributes
    items.forEach((item, index) => {
      if (!item.id) {
        item.id = `uibit-carousel-slide-${index}`;
      }
      item.setAttribute('role', 'group');
      item.setAttribute('aria-roledescription', 'slide');
      item.setAttribute('aria-label', msg(str`Slide ${index + 1} of ${this.totalSlides}`));
    });

    this.updateNavigationState();
    this.setupResizeObserver();
    this.setupSlideObserver();
  }

  private setupSlideObserver() {
    if (!this.content) return;
    this.slideObserver?.disconnect();
    this.slideIntersectionRatios.clear();

    const slides = this.getSlides();
    if (!slides.length) return;

    this.slideObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => this.slideIntersectionRatios.set(e.target, e.intersectionRatio));

      if (this.isProgrammaticScroll) return;

      let maxRatio = -1;
      let closestIndex = this.currentIndex;
      slides.forEach((slide, index) => {
        const ratio = this.slideIntersectionRatios.get(slide) ?? 0;
        if (ratio > maxRatio) {
          maxRatio = ratio;
          closestIndex = index;
        }
      });

      if (closestIndex !== this.currentIndex) {
        this.currentIndex = closestIndex;
        this.updateNavigationState();
        this.emitSlideChange();
      } else {
        this.updateNavigationState();
      }
    }, {
      root: this.content,
      threshold: [0, 0.25, 0.5, 0.75, 1.0],
    });

    slides.forEach(s => this.slideObserver!.observe(s));
    this.registerDisposable(() => this.slideObserver?.disconnect());
  }

  private setupResizeObserver() {
    if (!this.content || this.resizeObserver) return;
    this.resizeObserver = new ResizeObserver(() => {
      this.updateNavigationState();
    });
    this.resizeObserver.observe(this.content);
    this.registerDisposable(() => this.resizeObserver?.disconnect());
  }

  private setupKeyboardNavigation() {
    this.listen(this, 'keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        this.prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        this.next();
      }
    });
  }

  private setupAutoPlay() {
    this.stopAutoPlay();
    if (!this.autoPlay || this.isPausedByInteraction) return;

    this.autoPlayTimer = window.setInterval(() => {
      if (this.currentIndex < this.totalSlides - 1) {
        this.next();
      } else if (this.loop) {
        this.scrollToSlide(0);
      }
    }, this.autoPlayInterval);
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = undefined;
    }
  }

  private getSlides(): HTMLElement[] {
    const slots = this.shadowRoot?.querySelectorAll('slot') ?? [];
    const slides: HTMLElement[] = [];
    slots.forEach(slot => {
      const name = slot.getAttribute('name');
      if (name === 'item' || !name) {
        const assigned = slot.assignedElements() as HTMLElement[];
        slides.push(...assigned.filter(el => {
          const s = el.getAttribute('slot');
          return s === 'item' || !s;
        }));
      }
    });
    return slides;
  }

  private updateNavigationState() {
    this.canPrev = this.currentIndex > 0 || this.loop;
    this.canNext = this.currentIndex < this.totalSlides - 1 || this.loop;
  }

  prev() {
    if (this.currentIndex > 0) {
      this.scrollToSlide(this.currentIndex - 1);
    } else if (this.loop) {
      this.scrollToSlide(this.totalSlides - 1);
    }
  }

  next() {
    if (this.currentIndex < this.totalSlides - 1) {
      this.scrollToSlide(this.currentIndex + 1);
    } else if (this.loop) {
      this.scrollToSlide(0);
    }
  }

  goToSlide(index: number) {
    if (index >= 0 && index < this.totalSlides) {
      this.scrollToSlide(index);
    }
  }

  private scrollToSlide(index: number) {
    if (!this.content) return;

    const items = this.getSlides();
    const item = items[index];

    if (item) {
      this.isProgrammaticScroll = true;
      if (this.programmaticScrollTimeout) {
        clearTimeout(this.programmaticScrollTimeout);
      }

      const containerRect = this.content.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const style = window.getComputedStyle(this.content);
      const paddingLeft = parseFloat(style.paddingLeft) || 0;
      const targetScrollLeft = this.content.scrollLeft + (itemRect.left - containerRect.left) - paddingLeft;

      this.content.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });

      this.currentIndex = index;
      this.updateNavigationState();
      this.emitSlideChange();

      const onScrollEnd = () => {
        this.isProgrammaticScroll = false;
        this.content?.removeEventListener('scrollend', onScrollEnd);
      };

      if ('onscrollend' in window) {
        this.content.addEventListener('scrollend', onScrollEnd);
      }

      this.programmaticScrollTimeout = window.setTimeout(() => {
        this.isProgrammaticScroll = false;
        if (this.content && 'onscrollend' in window) {
          this.content.removeEventListener('scrollend', onScrollEnd);
        }
      }, this.duration + 100);
    }
  }

  private emitSlideChange() {
    this.dispatchCustomEvent('slide-change', {
      index: this.currentIndex,
      totalSlides: this.totalSlides
    });
  }

  private handleSlotChange() {
    this.setupCarousel();
  }

  render() {
    const isAutoplayPlaying = this.autoPlay && !this.isPausedByInteraction;
    return html`
      <div 
        part="carousel" 
        class="carousel" 
        role="region" 
        aria-roledescription="carousel" 
        aria-label=${msg('Content Carousel')}
      >
        <div
          part="viewport"
          class="carousel-viewport"
          aria-live="${isAutoplayPlaying ? 'off' : 'polite'}"
        >
          <div
            part="content"
            class="carousel-content"
          >
            <slot name="item" @slotchange=${this.handleSlotChange}></slot>
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
        </div>

        <div part="controls" class="carousel-controls">
          <div part="buttons" class="carousel-buttons">
            <slot name="prev" @click=${() => this.prev()}>
              <button
                part="button button-prev"
                class="carousel-button"
                aria-label=${msg('Previous slide')}
                ?disabled=${!this.canPrev}
              >
                ${getIcon('chevron-left', 16)}
              </button>
            </slot>
            <slot name="next" @click=${() => this.next()}>
              <button
                part="button button-next"
                class="carousel-button"
                aria-label=${msg('Next slide')}
                ?disabled=${!this.canNext}
              >
                ${getIcon('chevron-right', 16)}
              </button>
            </slot>
          </div>

          <slot name="indicators">
            <div part="indicators" class="carousel-indicators" role="tablist" aria-label=${msg('Slides')}>
              ${Array.from({ length: this.totalSlides }).map(
                (_, index) => html`
                  <button
                    role="tab"
                    part="indicator ${index === this.currentIndex ? 'indicator-active' : ''}"
                    class="carousel-indicator ${index === this.currentIndex ? 'active' : ''}"
                    aria-label=${msg(str`Go to slide ${index + 1}`)}
                    aria-selected=${index === this.currentIndex}
                    aria-controls="uibit-carousel-slide-${index}"
                    @click=${() => this.goToSlide(index)}
                  ></button>
                `
              )}
            </div>
          </slot>
        </div>
      </div>
    `;
  }
}

export default UIBitCarousel;
