import React, { useState } from 'react';
import '@uibit/effect-trigger';
import { UsageExample } from '../../../../types/docs';

function KanbanMoveDemo() {
  const [column, setColumn] = useState<'progress' | 'done'>('progress');

  const handleMove = () => {
    setColumn('done');
    const trigger = document.getElementById('kanban-sweep-trigger') as any;
    if (trigger) trigger.ignite();
  };

  const handleParticleCreate = (e: any) => {
    const clone = e.detail.particle;
    clone.innerHTML = `
      <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#111827" strokeWidth="2.5" class="bg-white rounded-full shadow p-1 border border-gray-100">
        <path d="M20 6L9 17l-5-5M12 5l7 7-7 7" />
      </svg>
    `;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white max-w-sm mx-auto shadow-sm relative">
      <uibit-effect-trigger
        id="kanban-sweep-trigger"
        trigger="custom"
        behavior="traverse-x-right"
        velocity="1.2s"
        density={1}
        randomize
        onUibitParticleCreate={handleParticleCreate}
      >
        <div slot="trigger" style={{ display: 'none' }}></div>
        <span slot="asset"></span>
      </uibit-effect-trigger>

      <div className="grid grid-cols-2 gap-4">
        <div className="border border-gray-100 rounded p-3 bg-gray-50 min-h-[160px]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">In Progress</span>
          
          {column === 'progress' && (
            <div className="border border-gray-200 rounded bg-white p-2.5 shadow-sm space-y-2">
              <div className="text-xs font-bold text-gray-900 truncate">Implement Auth</div>
              <button
                onClick={handleMove}
                className="w-full bg-black hover:bg-gray-900 text-white text-[10px] py-1 px-2 rounded font-medium flex items-center justify-center space-x-1"
              >
                <span>Move to Done</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>

        <div className="border border-gray-100 rounded p-3 bg-gray-50 min-h-[160px]">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-3">Done</span>
          
          {column === 'done' && (
            <div className="border border-gray-200 rounded bg-white p-2.5 shadow-sm space-y-2">
              <div className="text-xs font-bold text-gray-900 line-through text-gray-400">Implement Auth</div>
              <button
                onClick={() => setColumn('progress')}
                className="w-full text-center text-[10px] text-gray-400 hover:text-black font-medium"
              >
                Restore
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const kanbanMoveExample: UsageExample = {
  title: 'Kanban Task Board Transition',
  description:
    'Sweeps a micro double-checkmark vector across the horizontal axis when a card status moves between task columns.',
  code: {
    html: `<uibit-effect-trigger trigger="custom" behavior="traverse-x-right" density="1">
  <button slot="trigger" style="display:none"></button>
</uibit-effect-trigger>`,
    react: '',
  },
  Demo: KanbanMoveDemo,
};

export default kanbanMoveExample;
