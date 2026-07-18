import '@uibit/read-time';
import type { UsageExample } from '../../../../types/docs';

const articleText = `
  Design systems are more than just component libraries; they represent the shared language and architectural philosophy of a product organization. In modern software engineering, scaling user interface development across multiple teams requires a robust foundation that goes beyond standard UI kits. A complete design system encompasses visual design tokens, interactive components, comprehensive documentation, and engineering guidelines that ensure consistency, accessibility, and high performance.

  At the core of any successful design system is the concept of design tokens. Tokens are the atomic values of a design language—such as colors, spacing, typography, border radii, and shadows—stored in a technology-agnostic format like JSON. By defining these properties centrally, teams can distribute them to multiple platforms, including Web, iOS, Android, and design tools like Figma. This creates a single source of truth: if the primary brand color changes, it is updated in one repository and propagated everywhere automatically, eliminating manual coordination.

  Equally critical is component architecture. Building reusable components using standard Web APIs ensures longevity and framework independence. Web Components, constructed with Custom Elements, Shadow DOM, and HTML Templates, are ideal for design systems because they are natively supported by modern web browsers. They run seamlessly in React, Vue, Angular, Svelte, or vanilla HTML/JS without requiring complex integration layers. This encapsulation prevents style collisions and ensures that accessibility standards (such as WCAG AA compliance and keyboard navigation) are baked into every element by default.

  However, code is only half the battle. Documentation is what transforms a code repository into an active design system. Effective documentation must bridge the gap between design and engineering, providing clear usage guidelines, interactive playgrounds, accessibility reports, and copyable code snippets. When a developer can easily search for a component, understand its API, view its WCAG compliance checklist, and see it in action, the friction of building new features drops dramatically.

  Ultimately, investing in a design system pays dividends in both product quality and team velocity. Designers spend less time drawing standard buttons and more time solving complex user flows. Engineers spend less time arguing about CSS layouts and more time writing application logic. By establishing a shared registry of design tokens and accessible web components, organizations can deliver cohesive user experiences at a fraction of the traditional cost, paving the way for seamless scalability.

  Furthermore, a design system should evolve dynamically. It is not a static set of rules but a living product that adapts to new user research, technical advances, and business requirements. Maintaining a design system requires dedicated ownership, clear contribution models, and automated build pipelines that continuously test for visual regressions and accessibility violations. By treating the system as a product, teams ensure it remains relevant, reliable, and delightful to use for years to come.
`;

function Demo() {
  return (
    <uibit-read-time show-icon>
      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
        <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
          By UIBit Editors
        </span>
        <span className="text-gray-300">·</span>
        <span slot="timer" className="text-xs text-gray-500 font-medium"></span>
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        The Role of Typography in Editorial Design
      </h2>
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-4">
        {articleText.trim()}
      </p>
    </uibit-read-time>
  );
}

const example: UsageExample = {
  title: 'Article byline',
  description:
    'Place the component around your article content. A slot="timer" element is placed in the byline row, and the component automatically populates it with the calculated reading time.',
  Demo,
};

export default example;
