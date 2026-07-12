import { html, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, fromLucide, getIcon, msg, UIBitElement } from '@uibit/core';
import { Play, Pause, Volume1, Volume2, VolumeX, Maximize, Minimize } from 'lucide';
import { property, state, query } from 'lit/decorators.js';
import { styles } from './styles';

/**
 * Enhanced custom video component that wraps a native `<video>` or `<iframe>` element.
 * Provides custom interactive player controls with Scandinavian design aesthetics.
 *
 * @slot - The default slot where the native `<video>` or `<iframe>` element is placed.
 *
 * @cssprop [--uibit-video-radius=0.5rem] - Border radius of the video player.
 * @cssprop [--uibit-video-bg=#000000] - Background color of the video player.
 * @cssprop [--uibit-video-focus-color=#000000] - Focus outline color.
 * @cssprop [--uibit-video-control-bg=rgba(17, 24, 39, 0.85)] - Background of the control bar.
 * @cssprop [--uibit-video-control-border=rgba(255, 255, 255, 0.1)] - Border of the control bar.
 * @cssprop [--uibit-video-control-color=#ffffff] - Color of icons and text.
 */
@customElement('uibit-video')
export class Video extends UIBitElement {
  static styles = styles;

  /** Poster image URL. Also used as background for iframes before playing. */
  @property({ type: String }) poster = '';

  /** Show player controls. */
  @property({ type: Boolean }) controls = true;

  @state() private _isPlaying = false;
  @state() private _currentTime = 0;
  @state() private _duration = 0;
  @state() private _volume = 1;
  @state() private _isMuted = false;
  @state() private _isFullscreen = false;
  @state() private _isSeeking = false;
  @state() private _isVolumeSeeking = false;
  @state() private _isIframeMode = false;
  @state() private _iframePlaying = false;

  @query('.player-container') private _containerEl?: HTMLElement;

  private _videoEl: HTMLVideoElement | null = null;
  private _iframeEl: HTMLIFrameElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.listen(document, 'fullscreenchange', this._onFullscreenChange.bind(this));
  }

  firstUpdated(changedProperties: PropertyValues) {
    super.firstUpdated(changedProperties);
    this._detectSlottedElements();
  }

  private _detectSlottedElements() {
    const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
    let assigned: Element[] = [];
    if (slot) {
      assigned = slot.assignedElements({ flatten: true });
    }

    // Fallback for environments where slot is not fully resolved yet
    const video = (assigned.find(el => el.tagName === 'VIDEO') as HTMLVideoElement | undefined) || 
                  (this.querySelector('video') as HTMLVideoElement | null);
    if (video) {
      this._videoEl = video;
      this._isIframeMode = false;
      this._setupVideoListeners();
      if (!this.poster && video.hasAttribute('poster')) {
        this.poster = video.getAttribute('poster') || '';
      }
      return;
    }

    const iframe = (assigned.find(el => el.tagName === 'IFRAME') as HTMLIFrameElement | undefined) || 
                   (this.querySelector('iframe') as HTMLIFrameElement | null);
    if (iframe) {
      this._iframeEl = iframe;
      this._isIframeMode = true;
      this._iframeEl.style.display = 'none';
      return;
    }
  }

  private _setupVideoListeners() {
    if (!this._videoEl) return;

    // Hide default controls
    this._videoEl.controls = false;
    
    // Sync initial state
    this._isPlaying = !this._videoEl.paused;
    this._currentTime = this._videoEl.currentTime;
    this._duration = this._videoEl.duration || 0;
    this._volume = this._videoEl.volume;
    this._isMuted = this._videoEl.muted;

    // Bind event listeners
    this.listen(this._videoEl, 'play', () => { this._isPlaying = true; });
    this.listen(this._videoEl, 'pause', () => { this._isPlaying = false; });
    this.listen(this._videoEl, 'timeupdate', () => {
      if (!this._isSeeking) {
        this._currentTime = this._videoEl?.currentTime || 0;
      }
    });
    this.listen(this._videoEl, 'durationchange', () => {
      this._duration = this._videoEl?.duration || 0;
    });
    this.listen(this._videoEl, 'loadedmetadata', () => {
      this._duration = this._videoEl?.duration || 0;
      this._currentTime = this._videoEl?.currentTime || 0;
    });
    this.listen(this._videoEl, 'volumechange', () => {
      if (this._videoEl) {
        this._volume = this._videoEl.volume;
        this._isMuted = this._videoEl.muted;
      }
    });
    this.listen(this._videoEl, 'ended', () => {
      this._isPlaying = false;
    });
  }

  private _onSlotChange() {
    this._detectSlottedElements();
  }

  // ── Actions ────────────────────────────────────────────────────

  togglePlay() {
    if (this._isIframeMode) {
      this._playIframe();
      return;
    }

    if (!this._videoEl) return;
    if (this._isPlaying) {
      this._videoEl.pause();
    } else {
      this._videoEl.play();
    }
  }

  private _playIframe() {
    this._iframePlaying = true;
    if (this._iframeEl) {
      this._iframeEl.style.display = 'block';
      
      // Auto play YouTube / Vimeo if possible by rewriting source or appending autoplay
      const src = this._iframeEl.getAttribute('src') || '';
      if (src && !src.includes('autoplay=1')) {
        const separator = src.includes('?') ? '&' : '?';
        this._iframeEl.setAttribute('src', `${src}${separator}autoplay=1`);
      }
    }
  }

  toggleMute() {
    if (!this._videoEl) return;
    this._videoEl.muted = !this._videoEl.muted;
    this._isMuted = this._videoEl.muted;
  }

  private _onVolumePointerDown(e: PointerEvent) {
    this._isVolumeSeeking = true;
    this._updateVolumeFromEvent(e);
    const container = e.currentTarget as HTMLElement;
    container.setPointerCapture(e.pointerId);
  }

  private _onVolumePointerMove(e: PointerEvent) {
    if (!this._isVolumeSeeking) return;
    this._updateVolumeFromEvent(e);
  }

  private _onVolumePointerUp(e: PointerEvent) {
    if (!this._isVolumeSeeking) return;
    this._isVolumeSeeking = false;
    this._updateVolumeFromEvent(e);
    const container = e.currentTarget as HTMLElement;
    container.releasePointerCapture(e.pointerId);
  }

  private _updateVolumeFromEvent(e: PointerEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = Math.max(0, Math.min(offsetX / rect.width, 1));
    this._volume = pct;
    if (this._videoEl) {
      this._videoEl.volume = pct;
      this._videoEl.muted = pct === 0;
    }
    this._isMuted = pct === 0;
  }

  toggleFullscreen() {
    if (!this._containerEl) return;
    if (!document.fullscreenElement) {
      this._containerEl.requestFullscreen().catch((err) => {
        console.error('Failed to enter fullscreen:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }

  private _onFullscreenChange() {
    this._isFullscreen = document.fullscreenElement === this._containerEl;
  }

  // ── Timeline Scrubbing ─────────────────────────────────────────

  private _onTimelinePointerDown(e: PointerEvent) {
    if (!this._videoEl || !this._duration) return;
    this._isSeeking = true;
    this._updateTimelineFromEvent(e);
    const container = e.currentTarget as HTMLElement;
    container.setPointerCapture(e.pointerId);
  }

  private _onTimelinePointerMove(e: PointerEvent) {
    if (!this._isSeeking) return;
    this._updateTimelineFromEvent(e);
  }

  private _onTimelinePointerUp(e: PointerEvent) {
    if (!this._isSeeking) return;
    this._isSeeking = false;
    this._updateTimelineFromEvent(e);
    const container = e.currentTarget as HTMLElement;
    container.releasePointerCapture(e.pointerId);
  }

  private _updateTimelineFromEvent(e: PointerEvent) {
    if (!this._videoEl || !this._duration) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const offsetX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const pct = offsetX / rect.width;
    this._videoEl.currentTime = pct * this._duration;
    this._currentTime = this._videoEl.currentTime;
  }

  // ── Keyboard Navigation ────────────────────────────────────────

  private _onKeyDown(e: KeyboardEvent) {
    if (this._isIframeMode && this._iframePlaying) return;

    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      this.togglePlay();
    } else if (e.key === 'm') {
      e.preventDefault();
      this.toggleMute();
    } else if (e.key === 'f') {
      e.preventDefault();
      this.toggleFullscreen();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (this._videoEl) this._videoEl.currentTime = Math.min(this._duration, this._currentTime + 5);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (this._videoEl) this._videoEl.currentTime = Math.max(0, this._currentTime - 5);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this._videoEl) {
        this._videoEl.volume = Math.min(1, this._videoEl.volume + 0.1);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this._videoEl) {
        this._videoEl.volume = Math.max(0, this._videoEl.volume - 0.1);
      }
    }
  }

  // ── Formatting ─────────────────────────────────────────────────

  private _formatTime(sec: number): string {
    if (isNaN(sec) || !isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  private _onPlayerClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.closest('.controls-bar') || target.closest('.center-play-btn')) {
      return;
    }
    this.togglePlay();
  }

  // ── Render ─────────────────────────────────────────────────────

  render() {
    const progressPct = this._duration ? (this._currentTime / this._duration) * 100 : 0;
    const showOverlay = (!this._isPlaying && this._currentTime === 0) && !this._iframePlaying;
    const isPaused = !this._isPlaying;

    return html`
      <div 
        class="player-container ${isPaused ? 'paused' : ''} ${this._isSeeking ? 'seeking' : ''}" 
        part="container"
        @keydown=${this._onKeyDown}
        @click=${this._onPlayerClick}
        tabindex="0"
        aria-label=${msg('Video Player')}
      >
        <!-- Raw video/iframe goes here -->
        <slot @slotchange=${this._onSlotChange}></slot>

        <!-- Premium Iframe / Native Poster Overlay -->
        ${(this._isIframeMode && !this._iframePlaying) || showOverlay ? html`
          <div 
            class="poster-overlay" 
            part="poster" 
            style=${this.poster ? `background-image: url('${this.poster}');` : ''}
          >
            <button 
              class="center-play-btn" 
              part="center-play-btn"
              @click=${this.togglePlay}
              aria-label=${msg('Play Video')}
            ></button>
          </div>
        ` : nothing}

        <!-- Custom Controls (Only for native video mode, and only if controls enabled) -->
        ${!this._isIframeMode && this.controls ? html`
          <div class="controls-bar" part="controls-bar" @click=${(e: Event) => e.stopPropagation()}>
            <!-- Play/Pause -->
            <button 
              class="control-btn" 
              part="play-btn"
              @click=${this.togglePlay}
              aria-label=${this._isPlaying ? msg('Pause') : msg('Play')}
            >
              ${this._isPlaying 
                ? getIcon('pause', 18, fromLucide(Pause)) 
                : getIcon('play', 18, fromLucide(Play))}
            </button>

            <!-- Time display -->
            <div class="time-display" part="time-display">
              <span>${this._formatTime(this._currentTime)}</span>
              <span style="opacity: 0.5; margin: 0 0.25rem;">/</span>
              <span>${this._formatTime(this._duration)}</span>
            </div>

            <!-- Timeline -->
            <div 
              class="timeline-container" 
              part="timeline-container"
              @pointerdown=${this._onTimelinePointerDown}
              @pointermove=${this._onTimelinePointerMove}
              @pointerup=${this._onTimelinePointerUp}
              role="slider"
              aria-label=${msg('Seek timeline')}
              aria-valuemin="0"
              aria-valuemax=${Math.round(this._duration)}
              aria-valuenow=${Math.round(this._currentTime)}
              aria-valuetext=${`${this._formatTime(this._currentTime)} of ${this._formatTime(this._duration)}`}
              tabindex="0"
            >
              <div class="timeline-bar" part="timeline-bar">
                <div class="timeline-progress" part="timeline-progress" style="width: ${progressPct}%;"></div>
                <div class="timeline-handle" part="timeline-handle" style="left: ${progressPct}%;"></div>
              </div>
            </div>

            <!-- Volume Controls -->
            <div class="volume-container">
              <button 
                class="control-btn" 
                part="volume-btn"
                @click=${this.toggleMute}
                aria-label=${this._isMuted ? msg('Unmute') : msg('Mute')}
              >
                ${this._isMuted || this._volume === 0
                  ? getIcon('volume-x', 18, fromLucide(VolumeX))
                  : this._volume < 0.5
                  ? getIcon('volume-1', 18, fromLucide(Volume1))
                  : getIcon('volume-2', 18, fromLucide(Volume2))}
              </button>
              <div class="volume-slider-wrap">
                <div 
                  class="volume-slider-container" 
                  part="volume-slider-container"
                  @pointerdown=${this._onVolumePointerDown}
                  @pointermove=${this._onVolumePointerMove}
                  @pointerup=${this._onVolumePointerUp}
                  role="slider"
                  aria-label=${msg('Volume level')}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-valuenow=${Math.round((this._isMuted ? 0 : this._volume) * 100)}
                  tabindex="0"
                >
                  <div class="volume-slider-bar" part="volume-slider-bar">
                    <div class="volume-slider-progress" part="volume-slider-progress" style="width: ${(this._isMuted ? 0 : this._volume) * 100}%;"></div>
                    <div class="volume-slider-handle" part="volume-slider-handle" style="left: ${(this._isMuted ? 0 : this._volume) * 100}%;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Fullscreen -->
            <button 
              class="control-btn" 
              part="fullscreen-btn"
              @click=${this.toggleFullscreen}
              aria-label=${this._isFullscreen ? msg('Exit fullscreen') : msg('Fullscreen')}
            >
              ${this._isFullscreen
                ? getIcon('minimize', 18, fromLucide(Minimize))
                : getIcon('maximize', 18, fromLucide(Maximize))}
            </button>
          </div>
        ` : nothing}
      </div>
    `;
  }
}

export default Video;
