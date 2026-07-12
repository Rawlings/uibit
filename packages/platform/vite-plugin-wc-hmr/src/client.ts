// Patch customElements.define to be a no-op for already-registered names.
// This prevents throws when a module re-executes during HMR.
const origDefine = customElements.define.bind(customElements);
customElements.define = function (
  name: string,
  ctor: CustomElementConstructor,
  opts?: ElementDefinitionOptions,
) {
  if (!customElements.get(name)) origDefine(name, ctor, opts);
} as typeof customElements.define;

const registry = new Map<string, CustomElementConstructor>();

function applyAdoptedStyleSheets(instance: HTMLElement, clazz: CustomElementConstructor): void {
  const rec = clazz as unknown as { finalize?: () => void; elementStyles?: unknown };
  rec.finalize?.();

  const elementStyles = rec.elementStyles;
  if (!Array.isArray(elementStyles)) return;

  const sheets = elementStyles
    .map((s) => (s instanceof CSSStyleSheet ? s : (s as { styleSheet?: CSSStyleSheet }).styleSheet))
    .filter((s): s is CSSStyleSheet => s instanceof CSSStyleSheet);

  if (sheets.length === 0) return;

  const root = (instance as unknown as { renderRoot?: ShadowRoot }).renderRoot ?? instance.shadowRoot;
  if (root) root.adoptedStyleSheets = sheets;
}

function triggerRerender(instance: HTMLElement): void {
  const rec = instance as unknown as {
    requestUpdate?: () => void;
    update?: () => void;
    render?: () => unknown;
  };

  // Lit / ReactiveElement
  if (rec.requestUpdate) {
    rec.requestUpdate();
    return;
  }

  // Generic: call update() if present
  if (rec.update) {
    rec.update();
    return;
  }

  // Vanilla fallback: re-run render() into the shadow root if it returns a string
  if (rec.render) {
    const result = rec.render();
    const root = instance.shadowRoot;
    if (root && typeof result === 'string') root.innerHTML = result;
  }
}

export function register(
  importMeta: { url: string },
  tagName: string,
  clazz: CustomElementConstructor,
): void {
  const key = `${new URL(importMeta.url).pathname}:${tagName}`;

  if (!registry.has(key)) {
    registry.set(key, clazz);
    return;
  }

  registry.set(key, clazz);

  Promise.resolve().then(() => {
    const instances = [...document.querySelectorAll<HTMLElement>(tagName)];

    for (const instance of instances) {
      Object.setPrototypeOf(instance, clazz.prototype);
      applyAdoptedStyleSheets(instance, clazz);
      triggerRerender(instance);
    }

    console.log('[uibit-hmr]', tagName, `updated ${instances.length} instance(s)`);
  });
}
