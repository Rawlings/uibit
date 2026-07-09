import abTest from './ab-test';
import carousel from './carousel';
import consentGuard from './consent-guard';
import countdown from './countdown';
import hotspot from './hotspot';
import scratchReveal from './scratch-reveal';
import scrollProgress from './scroll-progress';
import signaturePad from './signature-pad';
import viewer360 from './viewer-360';
import { ComponentDocData } from '../../types/docs';

export const componentRegistry: Record<string, ComponentDocData> = {
  'ab-test': abTest,
  carousel: carousel,
  'consent-guard': consentGuard,
  countdown: countdown,
  hotspot: hotspot,
  'scratch-reveal': scratchReveal,
  'scroll-progress': scrollProgress,
  'signature-pad': signaturePad,
  'viewer-360': viewer360,
};
