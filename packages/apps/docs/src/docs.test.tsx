import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('Docs Application Shell', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-theme');
  });

  it('renders the header title and navigation links', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    // Assert the logo text exists
    expect(screen.getByText('UIBit')).toBeDefined();

    // Assert navigation links exist
    expect(
      screen.getAllByRole('link', { name: /Installation/i })[0],
    ).toBeDefined();
    expect(
      screen.getAllByRole('link', { name: /Accessibility/i })[0],
    ).toBeDefined();
    expect(screen.getAllByRole('link', { name: /Styling/i })[0]).toBeDefined();
    expect(
      screen.getAllByRole('link', { name: /Framework/i })[0],
    ).toBeDefined();
  });

  it('toggles dark mode when button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const toggleBtn = screen.getByRole('button', { name: /Toggle.*theme/i });
    expect(toggleBtn).toBeDefined();

    // Initial theme should default to light (assuming prefers-color-scheme is not mocked to dark)
    const initialTheme = localStorage.getItem('uibit-theme') || 'light';
    expect(document.documentElement.getAttribute('data-theme')).toBe(
      initialTheme,
    );

    // Click toggle button
    fireEvent.click(toggleBtn);

    const newTheme = initialTheme === 'light' ? 'dark' : 'light';
    expect(localStorage.getItem('uibit-theme')).toBe(newTheme);
    expect(document.documentElement.getAttribute('data-theme')).toBe(newTheme);
  });
});
