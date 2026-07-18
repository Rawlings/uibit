import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './signature.js';
import { Signature } from './signature.js';

describe('Signature Form Integration', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should support default values and reflect in form', async () => {
    container.innerHTML = `
      <form id="sig-form">
        <uibit-signature name="sig" value="data:image/png;base64,123"></uibit-signature>
      </form>
    `;

    const element = container.querySelector('uibit-signature') as Signature;
    await element.updateComplete;
    expect(element.value).toBe('data:image/png;base64,123');
    const form = container.querySelector('form') as HTMLFormElement;
    const formData = new FormData(form);
    expect(formData.get('sig')).toBe('data:image/png;base64,123');
  });

  it('should support validation based on drawing data existence', async () => {
    container.innerHTML = `
      <uibit-signature name="sig" required></uibit-signature>
    `;

    const element = container.querySelector('uibit-signature') as Signature;
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(true);

    element.value = 'data:image/png;base64,123';
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(false);
  });

  it('should reset drawing and state when form resets', async () => {
    container.innerHTML = `
      <form id="test-form">
        <uibit-signature name="sig" value="initial-signature"></uibit-signature>
      </form>
    `;
    const element = container.querySelector('uibit-signature') as Signature;
    await element.updateComplete;

    element.value = 'modified-signature';
    await element.updateComplete;
    expect(element.value).toBe('modified-signature');

    element.formResetCallback();
    await element.updateComplete;
    expect(element.value).toBe('initial-signature');
  });
});
