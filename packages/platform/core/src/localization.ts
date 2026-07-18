import { configureLocalization, msg, str } from '@lit/localize';
import type { LocaleModule } from '@lit/localize';

export { msg, str };
export type { LocaleModule };

let _setLocale: ((locale: string) => Promise<void>) | undefined;
let _getLocale: (() => string) | undefined;

/**
 * Configure UIBit localization. Call this once at app startup if you want
 * to support locales beyond the default English.
 *
 * @example
 * ```ts
 * import { configureUIBitLocalization } from '@uibit/core';
 *
 * const { setLocale } = configureUIBitLocalization({
 *   targetLocales: ['fr', 'de'],
 *   loadLocale: (locale) => import(`./locales/uibit.${locale}.js`),
 * });
 *
 * await setLocale('fr');
 * ```
 */
export function configureUIBitLocalization(options: {
  targetLocales: string[];
  loadLocale: (locale: string) => Promise<LocaleModule>;
}) {
  const result = configureLocalization({
    sourceLocale: 'en-US',
    targetLocales: options.targetLocales,
    loadLocale: options.loadLocale,
  });
  _setLocale = result.setLocale;
  _getLocale = result.getLocale;
  return result;
}

/**
 * Switch the active UIBit locale. Requires `configureUIBitLocalization` to
 * have been called first.
 */
export async function setLocale(locale: string): Promise<void> {
  if (!_setLocale) {
    throw new Error(
      '[uibit] Call configureUIBitLocalization() before setLocale().',
    );
  }
  return _setLocale(locale);
}

/**
 * Return the currently active UIBit locale tag (e.g. `"en-US"`, `"fr"`).
 * Returns `"en-US"` when localization has not been configured.
 */
export function getLocale(): string {
  return _getLocale ? _getLocale() : 'en-US';
}
