import '../../../platform/form-internals/src/test-helper.js';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import './sentiment-selector.js';
import { SentimentSelector } from './sentiment-selector.js';

describe('SentimentSelector Form Integration', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    container.remove();
  });

  it('should participate in form submission as a form-associated custom element', async () => {
    container.innerHTML = `
      <form id="test-form">
        <uibit-sentiment-selector name="score" value="4"></uibit-sentiment-selector>
      </form>
    `;

    const element = container.querySelector('uibit-sentiment-selector') as SentimentSelector;
    await element.updateComplete;
    expect(element.value).toBe('4');
    expect(element.valueAsNumber).toBe(4);
    expect((element.internals as any).formValue).toBe('4');
  });

  it('should support constraint validation requirements', async () => {
    container.innerHTML = `
      <uibit-sentiment-selector name="score" required></uibit-sentiment-selector>
    `;

    const element = container.querySelector('uibit-sentiment-selector') as SentimentSelector;
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(true);

    element.value = '3';
    await element.updateComplete;
    expect(element.validity.valueMissing).toBe(false);
  });
});
