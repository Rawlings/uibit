import '@uibit/isometric-cluster';
import manifest from '@uibit/isometric-cluster/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import cloudConsole from './examples/cloud-console';
import infrastructure from './examples/infrastructure';
import nodeSelect from './examples/node-select';

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
  examples: [cloudConsole, infrastructure, nodeSelect],
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
