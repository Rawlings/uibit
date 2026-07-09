import '@uibit/countdown';
import { UsageExample } from '../../../../types/docs';

function CustomLabelsDemo() {
  const target = new Date(Date.now() + 24 * 3600 * 1000 * 7).toISOString();

  return (
    <uibit-countdown target={target} auto-start format="DD:HH:MM:SS">
      <span slot="days-label">d</span>
      <span slot="hours-label">h</span>
      <span slot="minutes-label">m</span>
      <span slot="seconds-label">s</span>
    </uibit-countdown>
  );
}

const example: UsageExample = {
  title: 'Custom Labels',
  description: 'Use slots to customize or translate the unit labels.',
  code: {
    html: `<uibit-countdown target="2026-12-31T23:59:59" auto-start format="DD:HH:MM:SS">
  <span slot="days-label">d</span>
  <span slot="hours-label">h</span>
  <span slot="minutes-label">m</span>
  <span slot="seconds-label">s</span>
</uibit-countdown>`,
    react: `import '@uibit/countdown';

function CompactTimer() {
  const target = new Date(Date.now() + 24 * 3600 * 1000 * 7).toISOString();

  return (
    <uibit-countdown target={target} auto-start format="DD:HH:MM:SS">
      <span slot="days-label">d</span>
      <span slot="hours-label">h</span>
      <span slot="minutes-label">m</span>
      <span slot="seconds-label">s</span>
    </uibit-countdown>
  );
}`,
  },
  Demo: CustomLabelsDemo,
};

export default example;
