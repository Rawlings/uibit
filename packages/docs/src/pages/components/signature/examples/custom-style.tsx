import '@uibit/signature';
import { UsageExample } from '../../../../types/docs';

function CustomStyleDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-lg">
        <uibit-signature
          style={
            {
              '--uibit-signature-height': '240px',
              '--uibit-signature-stroke-color': '#1d4ed8',
              '--uibit-signature-stroke-width': '3px',
              '--uibit-signature-border': '2px solid #1d4ed8',
              '--uibit-signature-border-radius': '4px',
            } as React.CSSProperties
          }
        />
      </div>
    </div>
  );
}

const customStyle: UsageExample = {
  title: 'Custom Style',
  description: 'Use CSS custom properties to change the stroke color, border, and height of the pad.',
  Demo: CustomStyleDemo,
};

export default customStyle;
