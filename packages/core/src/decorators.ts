/**
 * A decorator that defines a custom element, checking if it is already registered
 * in the CustomElementRegistry first to avoid double-registration errors.
 * 
 * Inspired by the native customElement from lit.js.
 */
export function customElement(tagName: string) {
  return function (
    classOrTarget: any,
    context?: any
  ): any {
    if (context !== undefined && typeof context.addInitializer === 'function') {
      // Standard/Stage 3 decorators
      context.addInitializer(() => {
        if (!customElements.get(tagName)) {
          customElements.define(tagName, classOrTarget);
        }
      });
    } else {
      // Legacy TypeScript experimental decorators
      if (!customElements.get(tagName)) {
        customElements.define(tagName, classOrTarget);
      }
    }
  };
}
