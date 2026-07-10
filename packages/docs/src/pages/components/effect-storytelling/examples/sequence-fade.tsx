import '@uibit/effect-storytelling';
import { UsageExample } from '../../../../types/docs';

function SequenceFadeDemo() {
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', overflow: 'visible', background: '#fafafa', position: 'relative' }}>
      <style>{`
        .watch-teardown-stage {
          position: relative;
          background: #09090b;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          perspective: 1000px;
        }
        .watch-exploded-view {
          position: relative;
          width: 200px;
          height: 200px;
          transform-style: preserve-3d;
          transform: rotateX(45deg) rotateZ(-30deg);
        }
        .watch-screen {
          position: absolute;
          inset: 0;
          border: 4px solid #3f3f46;
          border-radius: 40px;
          background: rgba(99, 102, 241, 0.1);
          backdrop-filter: blur(4px);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lift-screen both;
          animation-timeline: --story-step-0;
        }
        @keyframes lift-screen {
          0% { transform: translateZ(0px); }
          100% { transform: translateZ(80px); }
        }
        /* Elevate & rotate the motherboard sensor array as step 1 scrolls */
        .watch-logic {
          position: absolute;
          inset: 15px;
          border: 2px solid #10b981;
          border-radius: 30px;
          background: rgba(16, 185, 129, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lift-rotate-logic both;
          animation-timeline: --story-step-1;
        }
        @keyframes lift-rotate-logic {
          0% { transform: translateZ(0px) rotate(0deg); }
          100% { transform: translateZ(50px) rotate(90deg); }
        }
        /* Highlight the inductive charging coil as step 2 scrolls */
        .watch-base {
          position: absolute;
          inset: 30px;
          border: 3px solid #f59e0b;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.05);
          transform: translateZ(0);
          animation: glow-base both;
          animation-timeline: --story-step-2;
        }
        @keyframes glow-base {
          0% { box-shadow: 0 0 0px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.4); }
        }
      `}</style>
      
      <uibit-effect-storytelling mode="sequence-fade" track-alignment="right">
        <div slot="stage" className="watch-teardown-stage">
          <div className="watch-exploded-view">
            {/* Base Sensor / Coil */}
            <div className="watch-base">
              <svg viewBox="0 0 100 100" fill="none" stroke="#f59e0b" strokeWidth="3" style={{ width: '100%', height: '100%', padding: '10px', boxSizing: 'border-box' }}>
                <circle cx="50" cy="50" r="35" strokeDasharray="5 3" />
                <circle cx="50" cy="50" r="20" />
              </svg>
            </div>
            
            {/* Logic Board */}
            <div className="watch-logic">
              <svg viewBox="0 0 100 100" fill="none" stroke="#10b981" strokeWidth="2" style={{ width: '100%', height: '100%', padding: '8px', boxSizing: 'border-box' }}>
                <rect x="25" y="25" width="50" height="50" rx="10" />
                <circle cx="50" cy="50" r="10" />
                <line x1="15" y1="50" x2="25" y2="50" />
                <line x1="75" y1="50" x2="85" y2="50" />
              </svg>
            </div>
            
            {/* Glass Screen */}
            <div className="watch-screen">
              <svg viewBox="0 0 120 120" fill="none" stroke="#6366f1" strokeWidth="3" style={{ width: '60px', height: '60px' }}>
                <path d="M30 60 A 30 30 0 1 1 90 60 A 30 30 0 1 1 30 60" strokeDasharray="3 3" />
                <text x="50%" y="55%" fill="#6366f1" fontSize="12" fontWeight="bold" textAnchor="middle" dominantBaseline="middle">10:08</text>
              </svg>
            </div>
          </div>
        </div>

        <div slot="track" style={{ padding: '0 2rem' }}>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 0' }}>
            <span style={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600, letterSpacing: '0.1em' }}>STEP 01</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Retina Glass Display</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              The curved sapphire glass screen lifts off. As you scroll, the screen assembly raises up to expose the internal wiring.
            </p>
          </section>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 0' }}>
            <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600, letterSpacing: '0.1em' }}>STEP 02</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>S10 Motherboard</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              Next, the custom-engineered logic module rises and spins 90 degrees, highlighting the neural processing engines.
            </p>
          </section>
          <section className="step" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem 0' }}>
            <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600, letterSpacing: '0.1em' }}>STEP 03</span>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: '#09090b' }}>Biosensor Array</h3>
            <p style={{ color: '#4b5563', lineHeight: '1.7', maxWidth: '28rem' }}>
              At the base, the high-precision biosensors activate, emitting concentric inductive pulses visible in the charging ring.
            </p>
          </section>
        </div>
      </uibit-effect-storytelling>
    </div>
  );
}

const example: UsageExample = {
  title: 'Sequence Fade',
  description: 'Stage children fade and slide as the corresponding track step scrolls into view. The classic step-by-step documentation layout.',
  Demo: SequenceFadeDemo,
};

export default example;
