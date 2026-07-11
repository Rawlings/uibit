import { describe, it, expect, afterEach, vi } from 'vitest';
import './video';
import { Video } from './video';

describe('Video Component', () => {
  let element: Video | null = null;

  afterEach(() => {
    if (element) {
      element.remove();
      element = null;
    }
  });

  it('scaffolds successfully with default properties', async () => {
    element = document.createElement('uibit-video') as Video;
    document.body.appendChild(element);
    await element.updateComplete;

    expect(element.poster).toBe('');
    expect(element.controls).toBe(true);
  });

  it('detects slotted native video and hides default controls', async () => {
    element = document.createElement('uibit-video') as Video;
    const video = document.createElement('video');
    video.src = 'test-video.mp4';
    video.controls = true;
    element.appendChild(video);

    document.body.appendChild(element);
    await new Promise(r => setTimeout(r, 50));
    await element.updateComplete;

    expect((element as any)._isIframeMode).toBe(false);
    expect(video.controls).toBe(false);
  });

  it('detects slotted iframe and enters iframe mode', async () => {
    element = document.createElement('uibit-video') as Video;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
    element.appendChild(iframe);

    document.body.appendChild(element);
    await new Promise(r => setTimeout(r, 50));
    await element.updateComplete;

    expect((element as any)._isIframeMode).toBe(true);
  });

  it('toggles play/pause states on video element', async () => {
    element = document.createElement('uibit-video') as Video;
    const video = document.createElement('video');
    video.src = 'test-video.mp4';
    element.appendChild(video);

    const playSpy = vi.spyOn(video, 'play').mockImplementation(async () => {});
    const pauseSpy = vi.spyOn(video, 'pause').mockImplementation(() => {});

    document.body.appendChild(element);
    await new Promise(r => setTimeout(r, 50));
    await element.updateComplete;

    // Initially paused, calling togglePlay should play it
    element.togglePlay();
    expect(playSpy).toHaveBeenCalled();

    // Set playing state manually for mock/test sync
    (element as any)._isPlaying = true;
    element.togglePlay();
    expect(pauseSpy).toHaveBeenCalled();
  });

  it('toggles mute states on video element', async () => {
    element = document.createElement('uibit-video') as Video;
    const video = document.createElement('video');
    video.src = 'test-video.mp4';
    element.appendChild(video);

    document.body.appendChild(element);
    await new Promise(r => setTimeout(r, 50));
    await element.updateComplete;

    expect(video.muted).toBe(false);
    element.toggleMute();
    expect(video.muted).toBe(true);
  });
});
