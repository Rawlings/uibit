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
 * - `right`:   Track on the right, stage on the left (default).
 * - `left`:    Track on the left, stage on the right.
 * - `center`:  Stage is full-width and sticky; track is a centered narrow column scrolling over it.
 * - `overlap`: Stage is full-width and sticky; track scrolls over it without width constraints.
 */
export type TrackAlignment = 'right' | 'left' | 'center' | 'overlap';

/** Determines which scroll container drives the animation timeline. */
export type TimelineScope = 'viewport' | 'container';

export interface EffectStorytellingConfig {
  mode?: StoryMode;
  trackAlignment?: TrackAlignment;
  timelineScope?: TimelineScope;
  snapPoints?: boolean;
}
