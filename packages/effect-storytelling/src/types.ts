/**
 * Built-in animation modes for the sticky stage.
 *
 * - `sequence-fade`: Stage steps fade in/out based on the active track step (default).
 * - `reveal-wipe`:  The second stage child wipes over the first along the scroll axis.
 * - `layer-depth`:  Stage steps recede in 3D as focus shifts to the active step.
 * - `zoom-focus`:   Stage steps scale and blur based on their distance from the active step.
 */
export type StoryMode = 'sequence-fade' | 'reveal-wipe' | 'layer-depth' | 'zoom-focus';

/**
 * Spatial relationship between the scrollable track and the sticky stage.
 *
 * - `right` / `split-left`: Track on the right, stage on the left (default).
 * - `left` / `split-right`: Track on the left, stage on the right.
 * - `center`: Stage is full-width and sticky; track is a centered narrow column scrolling over it.
 * - `overlap`: Stage is full-width and sticky; track scrolls over it without width constraints.
 * - `split-alternate`: Stage is full-bleed or side-aligned, track content alternates sides as you scroll.
 * - `overlay-center`: Cinematic full-bleed stage, text floats center-aligned.
 * - `overlay-bottom`: Cinematic full-bleed stage, text floats bottom-aligned.
 * - `sticky-top`: Visual stage occupies top half of viewport, track scrolls on bottom.
 * - `sticky-bottom`: Visual stage occupies bottom half of viewport, track scrolls on top.
 * - `headless`: Component sets up scroll timelines, but element layouts are fully handled by user CSS.
 */
export type TrackAlignment =
  | 'right'
  | 'split-left'
  | 'left'
  | 'split-right'
  | 'center'
  | 'overlap'
  | 'split-alternate'
  | 'overlay-center'
  | 'overlay-bottom'
  | 'sticky-top'
  | 'sticky-bottom'
  | 'headless';

/** Determines which scroll container drives the animation timeline. */
export type TimelineScope = 'viewport' | 'container';

export interface EffectStorytellingConfig {
  mode?: StoryMode;
  trackAlignment?: TrackAlignment;
  timelineScope?: TimelineScope;
  snapPoints?: boolean;
}
