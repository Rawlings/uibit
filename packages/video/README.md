# @uibit/video

A premium, customizable, and accessible web component wrapper for native `<video>` elements and `<iframe>` video embeds. 

Designed with Scandinavian minimal aesthetics, `@uibit/video` automatically replaces standard browser video player interfaces with a sleek, grayscale-themed control bar containing play/pause toggles, timeline scrubbing, volume controls, and fullscreen actions.

## Installation

```bash
npm install @uibit/video
# or
pnpm add @uibit/video
```

## Usage

### Native Video Element Wrapper

Simply wrap a standard HTML5 `<video>` element with `<uibit-video>`:

```html
<uibit-video poster="https://example.com/poster.jpg">
  <video src="https://example.com/video.mp4" loop muted></video>
</uibit-video>
```

### Video Iframe Wrapper (YouTube, Vimeo, etc.)

Wrap a video embed `<iframe>`. The component displays the premium poster overlay and play button, and switches to the active iframe on user play interaction:

```html
<uibit-video poster="https://example.com/youtube-poster.jpg">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
</uibit-video>
```

## API Reference

### Properties / Attributes

| Property | Attribute | Type | Default | Description |
|---|---|---|---|---|
| `poster` | `poster` | `string` | `""` | URL of the video poster/preview image. |
| `autoPlay` | `auto-play` | `boolean` | `false` | Automatically starts playback on load. |
| `loop` | `loop` | `boolean` | `false` | Loop the video playback. |
| `muted` | `muted` | `boolean` | `false` | Mutes audio by default. |
| `playsInline` | `plays-inline` | `boolean` | `false` | Allows inline video playback on mobile devices. |
| `controls` | `controls` | `boolean` | `true` | Show custom interactive controls bar. |

### Slots

| Slot Name | Description |
|---|---|
| (default) | The slotted native `<video>` or `<iframe>` element. |

### CSS Custom Properties

| Custom Property | Default | Description |
|---|---|---|
| `--uibit-video-radius` | `0.5rem` | Border radius of the video player player container. |
| `--uibit-video-bg` | `#000000` | Background of the video container. |
| `--uibit-video-control-bg` | `rgba(17, 24, 39, 0.85)` | Background of the control bar. |
| `--uibit-video-control-color` | `#ffffff` | Text and icon color inside the controls. |
| `--uibit-video-primary-btn-bg` | `#ffffff` | Background of the center play button. |

### Accessibility (A11y)

- All custom controls include accessible labels (`aria-label`) and appropriate focus rings.
- Supports keyboard controls:
  - `Space` or `k`: Toggle play/pause.
  - `m`: Toggle mute.
  - `f`: Toggle fullscreen.
  - `ArrowLeft` / `ArrowRight`: Seek backward/forward 5 seconds.
  - `ArrowUp` / `ArrowDown`: Increase/decrease volume.
