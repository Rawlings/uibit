import '@uibit/number-ticker';
import { UsageExample } from '../../../../types/docs';

function WithRepeatDemo() {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="text-7xl font-bold text-gray-900">
        <uibit-number-ticker value={1000000} prefix="$" locale="en-US" duration={2000} repeat></uibit-number-ticker>
      </div>
      <p className="text-sm text-gray-500">
        Scroll this element out of view and back to watch it replay.
      </p>
    </div>
  );
}

const withRepeat: UsageExample = {
  title: 'Repeat on scroll',
  description:
    'Add the `repeat` attribute to re-trigger the animation each time the element re-enters the viewport — useful for hero sections or carousels where the user may scroll past and return.',
  code: {
    html: `<uibit-number-ticker
  value="1000000"
  prefix="$"
  locale="en-US"
  duration="2000"
  repeat
></uibit-number-ticker>`,
    react: `import '@uibit/number-ticker';

function HeroStat() {
  return (
    <uibit-number-ticker
      value={1000000}
      prefix="$"
      locale="en-US"
      duration={2000}
      repeat
    />
  );
}`,
  },
  Demo: WithRepeatDemo,
};

export default withRepeat;
