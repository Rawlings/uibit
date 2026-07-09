import abTest from './ab-test';
import carousel from './carousel';
import consentGuard from './consent-guard';
import countdown from './countdown';
import hotspot from './hotspot';
import imageXray from './image-xray';
import numberTicker from './number-ticker';
import readTimer from './read-timer';
import scratchReveal from './scratch-reveal';
import scrollProgress from './scroll-progress';
import sentimentBar from './sentiment-bar';
import signaturePad from './signature-pad';
import typingText from './typing-text';
import viewer360 from './viewer-360';
import { ComponentDocData } from '../../types/docs';

export const componentRegistry: Record<string, ComponentDocData> = {
  'ab-test': abTest,
  carousel: carousel,
  'consent-guard': consentGuard,
  countdown: countdown,
  hotspot: hotspot,
  'image-xray': imageXray,
  'number-ticker': numberTicker,
  'read-timer': readTimer,
  'scratch-reveal': scratchReveal,
  'scroll-progress': scrollProgress,
  'sentiment-bar': sentimentBar,
  'signature-pad': signaturePad,
  'typing-text': typingText,
  'viewer-360': viewer360,
};
