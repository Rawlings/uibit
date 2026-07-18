import '@uibit/text-clamp';
import type { UsageExample } from '../../../../types/docs';

const btnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.25rem',
  padding: '0.125rem 0.625rem',
  marginLeft: '0.375rem',
  background: 'transparent',
  border: '0.0625rem solid #d1d5db',
  borderRadius: '9999px',
  fontSize: '0.75rem',
  fontWeight: 500,
  color: '#374151',
  cursor: 'pointer',
  verticalAlign: 'middle',
  lineHeight: 1.5,
  fontFamily: 'inherit',
};

function CustomLabelsDemo() {
  return (
    <uibit-text-clamp
      lines={3}
      style={{ fontSize: '1rem', lineHeight: '1.625' }}
    >
      Scandinavian design is defined by simplicity, minimalism, and
      functionality. Its roots trace back to the 1950s when Nordic designers
      began blending fine art with everyday utility. The movement prioritises
      clean lines, natural materials, and a restrained palette — resulting in
      objects that feel both timeless and deeply human. In a world of visual
      noise, the quiet confidence of this aesthetic continues to resonate.
      Furniture, typography, and architecture from this tradition share a common
      thread: nothing is added that does not serve a purpose, and nothing that
      serves a purpose is left without care.
      <button type="button" slot="more" style={btnStyle}>
        Read more ↓
      </button>
      <button type="button" slot="less" style={btnStyle}>
        Show less ↑
      </button>
    </uibit-text-clamp>
  );
}

const customLabels: UsageExample = {
  title: 'Custom Labels',
  description:
    'Override the default More/Less toggles with your own slotted elements.',
  Demo: CustomLabelsDemo,
};

export default customLabels;
