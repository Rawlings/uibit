import '@uibit/signature-pad';
import { UsageExample } from '../../../../types/docs';

function CustomStyleDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-lg">
        <uibit-signature-pad
          style={
            {
              '--uibit-signature-pad-height': '240px',
              '--uibit-signature-pad-stroke-color': '#1d4ed8',
              '--uibit-signature-pad-stroke-width': '3px',
              '--uibit-signature-pad-border': '2px solid #1d4ed8',
              '--uibit-signature-pad-border-radius': '4px',
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
  code: {
    html: `<uibit-signature-pad
  style="
    --uibit-signature-pad-height: 240px;
    --uibit-signature-pad-stroke-color: #1d4ed8;
    --uibit-signature-pad-stroke-width: 3px;
    --uibit-signature-pad-border: 2px solid #1d4ed8;
    --uibit-signature-pad-border-radius: 4px;
  "
></uibit-signature-pad>`,
    react: `import '@uibit/signature-pad';

function CustomSignaturePad() {
  return (
    <uibit-signature-pad
      style={{
        '--uibit-signature-pad-height': '240px',
        '--uibit-signature-pad-stroke-color': '#1d4ed8',
        '--uibit-signature-pad-stroke-width': '3px',
        '--uibit-signature-pad-border': '2px solid #1d4ed8',
        '--uibit-signature-pad-border-radius': '4px',
      }}
    />
  );
}`,
  },
  Demo: CustomStyleDemo,
};

export default customStyle;
