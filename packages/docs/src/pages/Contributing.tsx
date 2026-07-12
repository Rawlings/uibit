import { Sidebar } from '../components/Sidebar';
import { useHead } from '../hooks/useHead';

export default function Contributing() {
  useHead({
    title: 'Contributing – UIBit',
    description: 'Guidelines for contributing to the UIBit web component library.',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="flex flex-col md:flex-row gap-8">
        <Sidebar activeId="contributing" className="hidden md:block" />

        <div className="flex-1 min-w-0">
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight">
              Contributing to UIBit
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
              Thank you for your interest in contributing to UIBit. We welcome contributions that help expand the capabilities, accessibility, and quality of our component library.
            </p>
          </header>

          <section className="py-10 scroll-mt-20 border-t border-gray-100 dark:border-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Ways to Contribute</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><strong>Feature Proposals</strong> – Suggest new components or enhancements to existing ones that address real-world application needs and user interface challenges.</li>
              <li><strong>Feedback & UX Refinements</strong> – Share observations on usability, visual design, animations, and how components behave in production environments.</li>
              <li><strong>Defect Reports</strong> – Report issues with rendering, performance, browser compatibility, or accessibility.</li>
              <li><strong>Documentation Improvements</strong> – Help refine component guides, examples, and descriptions to ensure they are clear and helpful.</li>
            </ul>
          </section>

          <section className="py-10 scroll-mt-20 border-t border-gray-100 dark:border-gray-900">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Standards and Guidelines</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">All contributions are expected to meet our standards for:</p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><strong>Accessibility</strong> – Components must adhere to WCAG guidelines, supporting screen readers, keyboard navigation, and proper ARIA standards.</li>
              <li><strong>Performance</strong> – Logic and styles should be structured to minimize package footprints and avoid unnecessary DOM re-renders.</li>
              <li><strong>Design System Alignment</strong> – Visual details should conform to our established design tokens, ensuring cohesive presentation across the entire catalog.</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
