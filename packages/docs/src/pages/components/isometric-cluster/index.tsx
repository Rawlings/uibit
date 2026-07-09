import '@uibit/isometric-cluster';
import manifest from '@uibit/isometric-cluster/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import cloudConsole from './examples/cloud-console';
import cloudConsoleRaw from './examples/cloud-console?raw';
import infrastructure from './examples/infrastructure';
import infrastructureRaw from './examples/infrastructure?raw';
import nodeSelect from './examples/node-select';
import nodeSelectRaw from './examples/node-select?raw';

// Map raw file contents to the react code panel dynamically
const processedExamples = [
  { ...cloudConsole, code: { react: cloudConsoleRaw } },
  { ...infrastructure, code: { react: infrastructureRaw } },
  { ...nodeSelect, code: { react: nodeSelectRaw } },
];

const data: ComponentDocData = {
  id: 'isometric-cluster',
  title: 'Isometric Cluster',
  description:
    'A flat infrastructure or inventory cluster that tilts into a 3D isometric stack on hover, spreading layers vertically so users can inspect and select individual nodes.',
  packageName: '@uibit/isometric-cluster',
  tagName: 'uibit-isometric-cluster',
  manifest,
  Demo: cloudConsole.Demo,
  demoCode: cloudConsole.code,
  examples: processedExamples,
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Each layer node is rendered as a focusable element that fires node-select on Enter or Space key press.',
      'The cluster region is labelled so screen readers understand it as a grouped set of interactive layers.',
      'Selected node state is conveyed via aria-pressed on each layer button.',
    ],
    keyboardNav: [
      { key: 'Tab', description: 'Move focus between layer nodes in the cluster.' },
      { key: 'Enter / Space', description: 'Select the focused layer and fire the node-select event.' },
    ],
  },
  features: [
    'Collapsed state renders a tight flat stack — one unified block at a glance',
    'Hover expands layers with a spring-eased CSS 3D transform — no canvas, no WebGL',
    'Pointer drag adjusts the tilt angle interactively via pointer capture',
    'Layer cards support icon swatch, label, and badge slots via JSON properties',
    'node-select and selection-change events drive external detail panels',
    'All dimensions and colors are CSS custom properties for full design system integration',
  ],
};

export default data;
