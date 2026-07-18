import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import './form';
import type { Form } from './form';

describe('Form Component', () => {
  let element: Form;

  beforeEach(async () => {
    element = document.createElement('uibit-form') as Form;
    document.body.appendChild(element);
    await element.updateComplete;
  });

  afterEach(() => {
    element.remove();
    vi.restoreAllMocks();
  });

  it('renders with default states', () => {
    expect(element.dirty).toBe(false);
    expect(element.status).toBe('idle');
    expect(element.step).toBe(1);
  });

  it('detects multiple steps from fieldsets', async () => {
    element.innerHTML = `
      <form>
        <fieldset id="step1">
          <input name="field1" value="A">
        </fieldset>
        <fieldset id="step2">
          <input name="field2" value="B">
        </fieldset>
      </form>
    `;
    await new Promise((r) => setTimeout(r, 20));
    await element.updateComplete;

    expect(element.stepsCount).toBe(2);

    const step1 = element.querySelector('#step1') as HTMLFieldSetElement;
    const step2 = element.querySelector('#step2') as HTMLFieldSetElement;
    expect(step1.style.display).not.toBe('none');
    expect(step2.style.display).toBe('none');
  });

  it('navigates through steps', async () => {
    element.innerHTML = `
      <form>
        <fieldset id="step1">
          <input name="field1" value="A" required>
        </fieldset>
        <fieldset id="step2">
          <input name="field2" value="B">
        </fieldset>
      </form>
    `;
    await new Promise((r) => setTimeout(r, 20));
    await element.updateComplete;

    expect(element.step).toBe(1);
    element.nextStep();
    await element.updateComplete;
    expect(element.step).toBe(2);

    const step1 = element.querySelector('#step1') as HTMLFieldSetElement;
    const step2 = element.querySelector('#step2') as HTMLFieldSetElement;
    expect(step1.style.display).toBe('none');
    expect(step2.style.display).not.toBe('none');

    element.prevStep();
    await element.updateComplete;
    expect(element.step).toBe(1);
    expect(step1.style.display).not.toBe('none');
    expect(step2.style.display).toBe('none');
  });

  it('validates current step before moving next', async () => {
    element.innerHTML = `
      <form>
        <fieldset id="step1">
          <input name="field1" value="" required>
        </fieldset>
        <fieldset id="step2">
          <input name="field2" value="B">
        </fieldset>
      </form>
    `;
    await new Promise((r) => setTimeout(r, 20));
    await element.updateComplete;

    element.nextStep();
    expect(element.step).toBe(1);

    const input = element.querySelector('input') as HTMLInputElement;
    input.value = 'Valid';
    element.nextStep();
    await element.updateComplete;
    expect(element.step).toBe(2);
  });

  it('tracks dirty state on input change', async () => {
    element.innerHTML = `
      <form>
        <input id="test-input" name="field" value="initial">
      </form>
    `;
    await new Promise((r) => setTimeout(r, 20));
    await element.updateComplete;

    expect(element.dirty).toBe(false);

    const input = element.querySelector('#test-input') as HTMLInputElement;
    input.value = 'changed';

    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(element.dirty).toBe(true);

    input.value = 'initial';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(element.dirty).toBe(false);
  });

  it('resets form elements and state', async () => {
    element.innerHTML = `
      <form>
        <input id="test-input" name="field" value="initial">
      </form>
    `;
    await new Promise((r) => setTimeout(r, 20));
    await element.updateComplete;

    const input = element.querySelector('#test-input') as HTMLInputElement;
    input.value = 'changed';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    expect(element.dirty).toBe(true);

    element.reset();
    expect(element.dirty).toBe(false);
    expect(input.value).toBe('initial');
  });

  it('handles fetch submit lifecycle', async () => {
    element.innerHTML = `
      <form action="/submit-url" method="POST">
        <input name="field" value="something">
      </form>
    `;
    await new Promise((r) => setTimeout(r, 20));
    await element.updateComplete;

    const fetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        status: 200,
      }),
    );
    globalThis.fetch = fetchMock;

    const submitPromise = element.submit();
    expect(element.status).toBe('pending');

    await submitPromise;
    expect(element.status).toBe('success');
    expect(fetchMock).toHaveBeenCalledWith('/submit-url', expect.any(Object));
  });
});
