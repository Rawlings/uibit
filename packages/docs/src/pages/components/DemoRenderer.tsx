import { useEffect, useState, useRef } from 'react';
import '@uibit/ab-test';
import '@uibit/carousel';
import '@uibit/consent-guard';
import '@uibit/countdown';
import '@uibit/hotspot';
import '@uibit/scratch-reveal';
import '@uibit/scroll-progress';
import '@uibit/signature-pad';
import '@uibit/360-viewer';

// 1. A/B Test Demo
const AB_STORAGE_KEY = 'demo-ab-test-docs';
function ABTestDemo() {
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [mountKey, setMountKey] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handle = (e: any) => setSelectedVariant(e.detail.variant);
    container.addEventListener('variant-rendered', handle);
    return () => container.removeEventListener('variant-rendered', handle);
  }, []);

  const forceVariant = (v: string) => {
    try {
      localStorage.setItem(AB_STORAGE_KEY, v);
    } catch (_) {}
    setSelectedVariant(v);
    setMountKey((k) => k + 1);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm text-gray-600">Force variant:</span>
        <button
          onClick={() => forceVariant('a')}
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
            selectedVariant === 'a'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
          }`}
        >
          Variant A
        </button>
        <button
          onClick={() => forceVariant('b')}
          className={`px-3 py-1.5 rounded text-sm font-medium border transition-colors ${
            selectedVariant === 'b'
              ? 'bg-gray-900 text-white border-gray-900'
              : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
          }`}
        >
          Variant B
        </button>
      </div>

      <div className="max-w-md" ref={containerRef}>
        <uibit-ab-test key={mountKey} storage-key={AB_STORAGE_KEY}>
          <div
            slot="variant-a"
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <img
              src="https://picsum.photos/seed/product-a/480/220"
              alt="Minimal desk setup"
              className="w-full object-cover"
              style={{ height: '160px' }}
            />
            <div className="p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                New Arrival
              </p>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Arc Desk Lamp</h3>
              <p className="text-gray-500 text-sm mb-4">
                Warm-toned ambient light with touch dimming. Ships in 2 days.
              </p>
              <button className="w-full bg-gray-900 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-gray-700 transition">
                Add to Cart — $89
              </button>
            </div>
          </div>
          <div
            slot="variant-b"
            className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="relative">
              <img
                src="https://picsum.photos/seed/product-b/480/220"
                alt="Minimal desk setup"
                className="w-full object-cover"
                style={{ height: '160px' }}
              />
              <span className="absolute top-3 left-3 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded">
                SALE 20% OFF
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
                Best Seller
              </p>
              <h3 className="text-base font-semibold text-gray-900 mb-2">Arc Desk Lamp</h3>
              <p className="text-gray-500 text-sm mb-4">
                <span className="line-through text-gray-400 mr-1">$89</span>
                <span className="text-gray-900 font-semibold">$71</span> — Limited stock.
              </p>
              <button className="w-full border border-gray-900 text-gray-900 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-900 hover:text-white transition">
                Claim Offer
              </button>
            </div>
          </div>
        </uibit-ab-test>
      </div>
    </div>
  );
}

// 2. Carousel Demo
function CarouselDemo() {
  const carouselRef = useRef<any>(null);

  return (
    <div>
      <style>{`
        uibit-carousel {
          --uibit-carousel-items-per-view: 1;
          --uibit-carousel-gap: 1rem;
        }

        @media (min-width: 768px) {
          uibit-carousel {
            --uibit-carousel-items-per-view: 2;
          }
        }

        .carousel-slide {
          position: relative;
          height: 280px;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .carousel-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .carousel-slide-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.75rem 1rem;
          background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
          color: white;
          font-size: 0.875rem;
          font-weight: 500;
        }
      `}</style>

      <uibit-carousel ref={carouselRef} loop>
        <div slot="item" className="carousel-slide">
          <img src="https://picsum.photos/seed/alps/900/560" alt="Alpine meadow at dawn" />
          <span className="carousel-slide-caption">Alpine Meadow — Graubünden, Switzerland</span>
        </div>
        <div slot="item" className="carousel-slide">
          <img src="https://picsum.photos/seed/coastline/900/560" alt="Rocky coastline at sunset" />
          <span className="carousel-slide-caption">Rugged Coastline — Algarve, Portugal</span>
        </div>
        <div slot="item" className="carousel-slide">
          <img src="https://picsum.photos/seed/kyoto/900/560" alt="Temple path in autumn forest" />
          <span className="carousel-slide-caption">Temple Path — Kyoto, Japan</span>
        </div>
        <div slot="item" className="carousel-slide">
          <img src="https://picsum.photos/seed/dunes/900/560" alt="Sand dunes at golden hour" />
          <span className="carousel-slide-caption">Sand Dunes — Merzouga, Morocco</span>
        </div>
      </uibit-carousel>
    </div>
  );
}

// 3. Consent Guard Demo
function ConsentGuardDemo() {
  const guardRef1 = useRef<any>(null);
  const guardRef2 = useRef<any>(null);

  useEffect(() => {
    const handleAccepted = (e: any) => {
      console.log('Consent accepted for:', e.detail.title);
    };

    const handleDeclined = (e: any) => {
      console.log('Consent declined for:', e.detail.title);
    };

    const guard1 = guardRef1.current;
    const guard2 = guardRef2.current;

    if (guard1) {
      guard1.addEventListener('consent-accepted', handleAccepted);
      guard1.addEventListener('consent-declined', handleDeclined);
    }

    if (guard2) {
      guard2.addEventListener('consent-accepted', handleAccepted);
      guard2.addEventListener('consent-declined', handleDeclined);
    }

    return () => {
      if (guard1) {
        guard1.removeEventListener('consent-accepted', handleAccepted);
        guard1.removeEventListener('consent-declined', handleDeclined);
      }
      if (guard2) {
        guard2.removeEventListener('consent-accepted', handleAccepted);
        guard2.removeEventListener('consent-declined', handleDeclined);
      }
    };
  }, []);

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Iframe Example
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This example shows a consent guard wrapping an external iframe. Click "Accept Cookies" to
          load the content.
        </p>
        <uibit-consent-guard
          ref={guardRef1}
          title="External Embed"
          description="This iframe requires your consent to load third-party content."
          src="https://www.youtube.com/embed/jNQXAC9IVRw"
          content-type="iframe"
          height="380"
        ></uibit-consent-guard>
      </div>

      <div className="border-t border-gray-200 pt-12">
        <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
          Script Placeholder
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          This example demonstrates a script-based consent guard with a custom placeholder image.
        </p>
        <uibit-consent-guard
          ref={guardRef2}
          title="Analytics Script"
          description="Enable analytics to help us understand how you use our service."
          src="https://cdn.example.com/analytics.js"
          content-type="script"
          placeholder-image="https://picsum.photos/seed/analytics/600/200"
          accept-label="Accept & Load"
          decline-label="Decline"
        ></uibit-consent-guard>
      </div>
    </div>
  );
}

// 4. Countdown Demo
function CountdownDemo() {
  const targetTime = new Date(Date.now() + 3600 * 1000 * 2.5).toISOString(); // 2.5 hours from now
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Counting down to 2 hours and 30 minutes from now:
      </p>
      <div className="max-w-md bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <uibit-countdown target={targetTime} autoStart={true} format="HH:MM:SS"></uibit-countdown>
      </div>
    </div>
  );
}

// 5. Hotspot Demo
function HotspotDemo() {
  const hotspots = [
    {
      id: '1',
      x: 25,
      y: 35,
      label: 'High-Fidelity Drivers',
      title: 'High-Fidelity Drivers',
      content:
        'Custom acoustic chambers deliver deep bass, ultra-low distortion, and crisp high frequencies.',
    },
    {
      id: '2',
      x: 70,
      y: 45,
      label: 'Memory Foam Cushioning',
      title: 'Memory Foam Cushioning',
      content:
        'Wrapped in breathable mesh and soft memory foam for all-day comfort without ear fatigue.',
    },
    {
      id: '3',
      x: 48,
      y: 75,
      label: 'Adaptive ANC Microphone',
      title: 'Adaptive ANC Microphone',
      content: 'Continuously monitors ambient noise to cancel sound or enable transparency mode.',
    },
  ];

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Click the blinking pulse triggers below to open the annotation details:
      </p>
      <div className="max-w-2xl mx-auto bg-white rounded-lg border border-gray-200 p-2 overflow-hidden shadow-sm">
        <uibit-hotspot hotspots={JSON.stringify(hotspots)} trigger="click">
          <img
            src="https://picsum.photos/seed/headphones/800/450"
            alt="Premium over-ear headphones on a minimal surface"
            className="w-full rounded-lg"
          />
        </uibit-hotspot>
      </div>
    </div>
  );
}

// 6. Scratch Reveal Demo
function ScratchRevealDemo() {
  const elementRef = useRef<any>(null);
  const handleReset = () => {
    if (elementRef.current) {
      elementRef.current.reset();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="relative border border-gray-300 rounded-lg overflow-hidden bg-white shadow-md">
        <uibit-scratch-reveal
          ref={elementRef}
          style={
            {
              '--uibit-scratch-reveal-width': '320px',
              '--uibit-scratch-reveal-height': '200px',
              '--uibit-scratch-reveal-background': '#ffffff',
              '--uibit-scratch-reveal-color': '#000000',
              '--uibit-scratch-reveal-overlay-color': '#b0b0b0',
            } as React.CSSProperties
          }
        >
          <div className="flex flex-col items-center justify-center gap-2 text-center px-4">
            <span className="text-3xl">🎉</span>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              You've won
            </p>
            <p className="text-2xl font-bold text-gray-900 tracking-tight">30% OFF</p>
            <p className="text-sm text-gray-500">
              Use code <span className="font-mono font-bold text-gray-800">LUCKY30</span> at checkout
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Valid until midnight · One use per customer
            </p>
          </div>
        </uibit-scratch-reveal>
      </div>

      <button
        onClick={handleReset}
        className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Reset Scratch Card
      </button>
    </div>
  );
}

// 7. Scroll Progress Demo
function ScrollProgressDemo() {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Scroll inside the container below to see the local progress bar update at the top of the
        box:
      </p>

      <div
        id="demo-scroll-box"
        className="relative border border-gray-300 rounded-lg h-60 overflow-y-scroll bg-white shadow-inner"
        style={{ scrollbarWidth: 'thin' }}
      >
        <uibit-scroll-progress
          target="#demo-scroll-box"
          style={
            {
              '--uibit-scroll-progress-color': '#000000',
              '--uibit-scroll-progress-height': '4px',
            } as React.CSSProperties
          }
          className="sticky top-0 z-10 block"
        ></uibit-scroll-progress>

        <div className="p-6 space-y-4">
          <img
            src="https://picsum.photos/seed/nordic/720/300"
            alt="Nordic landscape"
            className="w-full rounded-lg object-cover"
            style={{ height: '160px' }}
          />
          <h3 className="text-base font-semibold text-gray-900">Designing for the Long Read</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Reading progress indicators reduce uncertainty for long-form content — users know how far
            they've come and how much remains. A well-placed progress bar can meaningfully reduce
            drop-off rates on editorial pages and documentation.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            The key is restraint: the bar should be visible without demanding attention. A 3–4px
            height, neutral color, and fixed position at the top of the container or viewport tends
            to work across most layouts.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            When targeting a scrollable container rather than the full window, the component tracks
            scroll position relative to that element's scrollable height — useful for sidebars,
            modals, or card-based reading views.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Pair it with a sticky table of contents or section anchors for a complete reading
            experience that respects users' time and orientation.
          </p>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest pt-2">
            — End of article
          </p>
        </div>
      </div>
    </div>
  );
}

// 8. Signature Pad Demo
function SignaturePadDemo() {
  const padRef = useRef<any>(null);

  const handleClear = () => {
    padRef.current?.clear();
  };

  const handleExportPng = () => {
    const dataUrl = padRef.current?.toDataURL();
    if (!dataUrl) return;
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = 'signature.png';
    a.click();
  };

  const handleExportSvg = () => {
    const svg = padRef.current?.toSVG();
    if (!svg) return;
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'signature.svg';
    a.click();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="w-full max-w-lg">
        <uibit-signature-pad
          ref={padRef}
          style={
            {
              '--uibit-signature-pad-height': '180px',
              '--uibit-signature-pad-stroke-color': '#111111',
              '--uibit-signature-pad-stroke-width': '2.5px',
            } as React.CSSProperties
          }
        />
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={handleClear}
          className="px-4 py-2 border border-gray-300 text-gray-700 rounded text-sm font-medium hover:border-gray-900 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleExportPng}
          className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Export PNG
        </button>
        <button
          onClick={handleExportSvg}
          className="px-4 py-2 bg-gray-950 text-white rounded text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Export SVG
        </button>
      </div>
    </div>
  );
}

// 9. 360 Viewer Demo
function Viewer360Demo() {
  const demoImages = [
    'https://picsum.photos/seed/sneaker1/600/400',
    'https://picsum.photos/seed/sneaker2/600/400',
    'https://picsum.photos/seed/sneaker3/600/400',
    'https://picsum.photos/seed/sneaker4/600/400',
    'https://picsum.photos/seed/sneaker5/600/400',
    'https://picsum.photos/seed/sneaker6/600/400',
  ];

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Drag the image or use the buttons/arrow keys to rotate the 360 view:
      </p>
      <div className="max-w-xl mx-auto bg-white rounded-lg p-4 border border-gray-200">
        <uibit-360-viewer
          images={JSON.stringify(demoImages)}
          auto-rotate="true"
          rotation-speed={150}
        ></uibit-360-viewer>
      </div>
    </div>
  );
}

interface DemoRendererProps {
  componentId: string;
}

export function DemoRenderer({ componentId }: DemoRendererProps) {
  switch (componentId) {
    case 'ab-test':
      return <ABTestDemo />;
    case 'carousel':
      return <CarouselDemo />;
    case 'consent-guard':
      return <ConsentGuardDemo />;
    case 'countdown':
      return <CountdownDemo />;
    case 'hotspot':
      return <HotspotDemo />;
    case 'scratch-reveal':
      return <ScratchRevealDemo />;
    case 'scroll-progress':
      return <ScrollProgressDemo />;
    case 'signature-pad':
      return <SignaturePadDemo />;
    case 'viewer-360':
      return <Viewer360Demo />;
    default:
      return null;
  }
}
