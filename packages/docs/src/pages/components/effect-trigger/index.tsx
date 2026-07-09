import React, { useState, useEffect } from 'react';
import '@uibit/effect-trigger';
import { EffectTrigger } from '@uibit/effect-trigger';
import manifest from '@uibit/effect-trigger/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';

function EffectTriggerDemo() {
  const [behavior, setBehavior] = useState('float-displace');
  const [triggerType, setTriggerType] = useState<'click' | 'hover' | 'visible' | 'custom'>('click');
  const [density, setDensity] = useState(8);
  const [velocity, setVelocity] = useState('1s');
  const [randomize, setRandomize] = useState(true);
  const [customRegistered, setCustomRegistered] = useState(false);

  useEffect(() => {
    if (!customRegistered && typeof window !== 'undefined') {
      // Register a custom confetti/gravity burst behavior
      EffectTrigger.registerBehavior('custom-confetti', (ctx) => {
        const { triggerEl, assetEl, containerEl } = ctx;
        const rect = triggerEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const colors = ['#f43f5e', '#3b82f6', '#10b981', '#eab308', '#a855f7'];

        for (let i = 0; i < 20; i++) {
          const clone = assetEl.cloneNode(true) as HTMLElement;
          clone.style.position = 'fixed';
          clone.style.pointerEvents = 'none';
          clone.style.zIndex = '999999';
          clone.style.left = `${centerX}px`;
          clone.style.top = `${centerY}px`;
          // Apply a random color to SVG or text
          clone.style.color = colors[Math.floor(Math.random() * colors.length)];

          const angle = Math.random() * Math.PI * 2;
          const distance = 80 + Math.random() * 150;
          const destX = Math.cos(angle) * distance;
          const destY = Math.sin(angle) * distance + 50; // drift down a bit

          containerEl.appendChild(clone);

          const anim = clone.animate([
            { transform: 'translate(-50%, -50%) translate(0, 0) scale(1) rotate(0deg)', opacity: '1' },
            { transform: `translate(-50%, -50%) translate(${destX}px, ${destY}px) scale(0.3) rotate(${Math.random() * 360}deg)`, opacity: '0' }
          ], {
            duration: 800 + Math.random() * 600,
            easing: 'ease-out'
          });

          anim.onfinish = () => clone.remove();
        }
      });
      setCustomRegistered(true);
    }
  }, [customRegistered]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
          Interactive Design Playground
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Controls */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Motion Behavior Matrix
              </label>
              <select
                value={behavior}
                onChange={(e) => setBehavior(e.target.value)}
                className="w-full text-sm bg-white border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="float-displace">float-displace (Floating up)</option>
                <option value="fountain-burst">fountain-burst (Physics fountain)</option>
                <option value="vortex-attractor">vortex-attractor (Inward spiral)</option>
                <option value="ambient-drift">ambient-drift (Rising bubbles)</option>
                <option value="focal-pop">focal-pop (Screen-center pop)</option>
                <option value="orbit-halo">orbit-halo (Circular ring)</option>
                <option value="traverse-x-right">traverse-x-right (Left-to-right sweep)</option>
                <option value="traverse-x-left">traverse-x-left (Right-to-left sweep)</option>
                <option value="traverse-y-up">traverse-y-up (Bottom-to-top sweep)</option>
                <option value="traverse-y-down">traverse-y-down (Top-to-bottom sweep)</option>
                <option value="custom-confetti">custom-confetti (Custom Registered Confetti)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Trigger Catalyst
                </label>
                <select
                  value={triggerType}
                  onChange={(e) => setTriggerType(e.target.value as any)}
                  className="w-full text-sm bg-white border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="click">click</option>
                  <option value="hover">hover (mouseenter)</option>
                  <option value="custom">custom (programmatic)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Velocity / Speed
                </label>
                <select
                  value={velocity}
                  onChange={(e) => setVelocity(e.target.value)}
                  className="w-full text-sm bg-white border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="600ms">600ms</option>
                  <option value="1s">1.0s</option>
                  <option value="2s">2.0s</option>
                  <option value="3.5s">3.5s</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Density (Asset Clones)
                </label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={density}
                  onChange={(e) => setDensity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full text-sm bg-white border border-gray-200 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <input
                  type="checkbox"
                  id="randomize-opt"
                  checked={randomize}
                  onChange={(e) => setRandomize(e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <label htmlFor="randomize-opt" className="text-xs font-semibold text-gray-700 select-none">
                  Randomize Drift/Spin
                </label>
              </div>
            </div>
          </div>

          {/* Target Demo Box */}
          <div className="border border-gray-200 bg-white rounded-lg flex flex-col items-center justify-center min-h-[220px] p-6 text-center relative overflow-hidden">
            <uibit-effect-trigger
              key={`${behavior}-${triggerType}-${density}-${velocity}-${randomize}`}
              trigger={triggerType}
              behavior={behavior}
              density={density}
              velocity={velocity}
              randomize={randomize}
              id="playground-trigger"
            >
              <button
                slot="trigger"
                className="bg-black hover:bg-gray-900 text-white font-medium text-sm py-2.5 px-6 rounded-md transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                {triggerType === 'hover' ? 'Hover Over Me' : 'Activate Catalyst'}
              </button>

              <div slot="asset">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ display: 'block' }}>
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
            </uibit-effect-trigger>

            {triggerType === 'custom' && (
              <button
                onClick={() => {
                  const trigger = document.getElementById('playground-trigger') as any;
                  if (trigger) trigger.ignite();
                }}
                className="mt-4 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
              >
                Call `.ignite()` programmatically
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const data: ComponentDocData = {
  id: 'effect-trigger',
  title: 'Effect Trigger',
  description:
    'A behavioral engine that intercepts user actions (click, hover, visible) on standard DOM elements to trigger custom particle animations, physics-based viewport crossings, or micro-feedback flows using slotted SVGs or markup templates.',
  packageName: '@uibit/effect-trigger',
  tagName: 'uibit-effect-trigger',
  manifest,
  Demo: EffectTriggerDemo,
  demoCode: {
    html: `<uibit-effect-trigger trigger="click" behavior="fountain-burst" density="12" randomize>
  <button slot="trigger">Activate Catalyst</button>
  <svg slot="asset" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
</uibit-effect-trigger>`,
    react: `<uibit-effect-trigger
  trigger="click"
  behavior="fountain-burst"
  density={12}
  randomize
>
  <button slot="trigger" className="btn-primary">
    Activate Catalyst
  </button>
  <svg slot="asset" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
  </svg>
</uibit-effect-trigger>`,
  },
  usages: [
    {
      title: 'Registering Custom Behaviors',
      description: 'You can define custom coordinate-based motion paths globally using the static registration registry API:',
      code: `import { EffectTrigger } from '@uibit/effect-trigger';

// Register custom movement
EffectTrigger.registerBehavior('custom-spiral', (ctx) => {
  const { triggerEl, assetEl, containerEl } = ctx;
  const clone = assetEl.cloneNode(true) as HTMLElement;
  
  // Custom setup & Web Animations API logic...
  containerEl.appendChild(clone);
  clone.animate([
    { transform: 'translate(0, 0) scale(1)' },
    { transform: 'translate(200px, -200px) scale(0)' }
  ], { duration: 1000 });
});`,
    },
  ],
  features: [
    'Complete decoupling of trigger element from visual assets',
    'Supports any slotted DOM, including SVG icons, custom markup, or image frames',
    '8+ pre-baked coordinate calculations and physics path archetypes out-of-the-box',
    'GPU-accelerated animations using native Web Animations API (WAAPI)',
    'Global coordinate cloning prevents clipping in overflow-hidden containers',
    'Static behavior registration system for user-defined custom motion algorithms',
    'Passive "custom" trigger mode for programmatic API integration (.ignite())',
  ],
};

export default data;
