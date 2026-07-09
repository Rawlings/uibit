import manifest from '@uibit/ab-test/custom-elements.json';
import { ComponentDocData } from '../../types/docs';

const data: ComponentDocData = {
  id: 'ab-test',
  title: 'A/B Test',
  description:
    'A/B testing utility component for framework-agnostic experimentation. Integrates with storage keys for persistence and automatically assigns user variants.',
  packageName: '@uibit/ab-test',
  tagName: 'uibit-ab-test',
  manifest,
  usages: [
    {
      title: 'Basic Layout (HTML)',
      code: `<uibit-ab-test storage-key="hero-ab-test">
  <section slot="variant-a">Layout A</section>
  <section slot="variant-b">Layout B</section>
</uibit-ab-test>`,
    },
    {
      title: 'React Implementation',
      code: `import { useEffect, useRef } from 'react';
import '@uibit/ab-test';

function BannerTest() {
  const abRef = useRef(null);

  useEffect(() => {
    const el = abRef.current;
    const onRender = (e) => {
      console.log('Variant assigned:', e.detail.variant);
    };
    el?.addEventListener('variant-rendered', onRender);
    return () => el?.removeEventListener('variant-rendered', onRender);
  }, []);

  return (
    <uibit-ab-test ref={abRef} storage-key="banner-variant">
      <div slot="variant-a">Design A</div>
      <div slot="variant-b">Design B</div>
    </uibit-ab-test>
  );
}`,
    },
  ],
  features: [
    'Automatic weight-based user variant assignments',
    'Saves variant locally to ensure user gets consistent layout on page reload',
    'Fully SSR/hydration safe (no server-side localstorage crashes)',
    'Dynamic property listener handles runtime updates reactively',
    'URL parameter overriding (?variant=b) to simplify debugging',
    'Standard slot integrations',
  ],
};

export default data;
