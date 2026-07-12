import '@uibit/form';
import manifest from '@uibit/form/custom-elements.json';
import { ComponentDocData } from '../../../types/docs';
import wizard from './examples/wizard';
import wizardRaw from './examples/wizard?raw';

function FormDemo() {
  return (
    <uibit-form
      class="block bg-gray-50 p-8"
    >
      <form action="https://httpbin.org/post" method="POST" className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="john@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="comments">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            rows={3}
            className="w-full px-3 py-2 border border-gray-200 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black"
            placeholder="Leave a message..."
          ></textarea>
        </div>

        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer"
          >
            Submit Form
          </button>
          <button
            type="reset"
            className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 cursor-pointer"
          >
            Reset
          </button>
        </div>
      </form>

      {/* Slotted feedback */}
      <div slot="loading" className="bg-gray-50 p-8">
        <p className="text-sm text-gray-600">Submitting form...</p>
      </div>

      <div slot="success" className="bg-gray-50 p-8">
        <h4 className="text-md font-semibold text-gray-900 mb-1">Form submitted</h4>
        <p className="text-sm text-gray-600">Thank you. Your submission was received.</p>
      </div>

      <div slot="error" className="text-sm text-gray-900 bg-gray-50 p-8">
        <p className="font-semibold">Submission failed</p>
        <p className="text-gray-600">Please check your inputs and try again.</p>
      </div>
    </uibit-form>
  );
}

const processedExamples = [
  { ...wizard, code: { react: wizardRaw } }
];

const data: ComponentDocData = {
  manifest,
  Demo: FormDemo,
  demoCode: {
    html: `<uibit-form class="bg-gray-50 p-8">
  <form action="/api/submit" method="POST" class="space-y-4">
    <div>
      <label for="name">Full Name *</label>
      <input id="name" name="name" type="text" required />
    </div>

    <div>
      <label for="email">Email Address *</label>
      <input id="email" name="email" type="email" required />
    </div>

    <button type="submit">Submit</button>
  </form>

  <div slot="loading" class="bg-gray-50 p-8">
    <p>Submitting form...</p>
  </div>

  <div slot="success" class="bg-gray-50 p-8">
    <h4>Form submitted</h4>
    <p>Thank you. Your submission was received.</p>
  </div>
</uibit-form>`,
    react: `import '@uibit/form';

function FormDemo() {
  return (
    <uibit-form class="bg-gray-50 p-8">
      <form action="/api/submit" method="POST" className="space-y-4">
        <div>
          <label htmlFor="name">Full Name *</label>
          <input id="name" name="name" type="text" required />
        </div>

        <div>
          <label htmlFor="email">Email Address *</label>
          <input id="email" name="email" type="email" required />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div slot="loading" className="bg-gray-50 p-8">
        <p>Submitting form...</p>
      </div>

      <div slot="success" className="bg-gray-50 p-8">
        <h4>Form submitted</h4>
        <p>Thank you. Your submission was received.</p>
      </div>
    </uibit-form>
  );
}`,
  },
  examples: processedExamples,
  features: [
    'Wraps around a native `<form>` slotted inside `<uibit-form>`.',
    'Multi-step Wizard mode automatically activated when multiple `<fieldset>` elements exist in the form.',
    'Form submit intercepts automatically when `action` is set on the native `<form>` element, submitting via `fetch` asynchronously.',
    'Exposes submission lifecycle status attributes (`idle`, `pending`, `success`, `error`) directly on the host.',
    'Dirty state tracking matches current input values against initial load state.',
    'Safety navigation prompt: warn-unsaved triggers a beforeunload prompt if the form has unsaved modifications.',
  ],
  a11y: {
    wcagLevel: 'AA',
    requirements: [
      'Slotted inputs retain native focus indicators.',
      'Wizard progress indicators use semantic text describing the current step.',
      'Fieldsets are automatically disabled when inactive to prevent screen reader navigation to hidden steps.',
      'Standard error validation messages leverage the native browser API (`reportValidity`).'
    ],
    keyboardNav: [
      { key: 'Tab', description: 'Navigate between form inputs and wizard controls.' },
      { key: 'Space / Enter', description: 'Activate buttons, checkboxes, and form submit.' }
    ]
  }
};

export default data;
