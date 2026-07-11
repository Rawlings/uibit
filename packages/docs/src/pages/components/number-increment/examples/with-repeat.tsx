import '@uibit/number-increment';
import { UsageExample } from '../../../../types/docs';

function WithRepeatDemo() {
  return (
    <div className="text-7xl font-bold text-gray-900">
      <uibit-number-increment
        value={1000000}
        duration={2000}
        repeat
        locale="en-US"
        options={{
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }}
      ></uibit-number-increment>
    </div>
  );
}

const withRepeat: UsageExample = {
  title: 'Repeat on scroll',
  description:
    'Add the `repeat` attribute to re-trigger the animation each time the element re-enters the viewport — useful for hero sections or carousels where the user may scroll past and return.',
  Demo: WithRepeatDemo,
};

export default withRepeat;
