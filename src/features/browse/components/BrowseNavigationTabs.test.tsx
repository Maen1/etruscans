import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowseNavigationTabs } from './BrowseNavigationTabs';

describe('BrowseNavigationTabs', () => {
  it('renders all three browse options with correct links', () => {
    render(<BrowseNavigationTabs activeTab="corpus" />);

    const corpusLink = screen.getByRole('link', { name: /by corpus/i });
    const tripLink = screen.getByRole('link', { name: /by trip/i });
    const publicationLink = screen.getByRole('link', { name: /by publication/i });

    expect(corpusLink).toHaveAttribute('href', '/browse');
    expect(tripLink).toHaveAttribute('href', '/browse/trip');
    expect(publicationLink).toHaveAttribute('href', '/browse/publication');
  });

  it('highlights corpus tab when activeTab is "corpus"', () => {
    render(<BrowseNavigationTabs activeTab="corpus" />);

    const corpusLink = screen.getByRole('link', { name: /by corpus/i });
    const tripLink = screen.getByRole('link', { name: /by trip/i });

    expect(corpusLink).toHaveAttribute('aria-current', 'page');
    expect(corpusLink.className).toContain('font-semibold');
    expect(tripLink).not.toHaveAttribute('aria-current');
  });

  it('highlights trip tab when activeTab is "trip"', () => {
    render(<BrowseNavigationTabs activeTab="trip" />);

    const tripLink = screen.getByRole('link', { name: /by trip/i });
    const publicationLink = screen.getByRole('link', { name: /by publication/i });

    expect(tripLink).toHaveAttribute('aria-current', 'page');
    expect(tripLink.className).toContain('font-semibold');
    expect(publicationLink).not.toHaveAttribute('aria-current');
  });

  it('highlights publication tab when activeTab is "publication"', () => {
    render(<BrowseNavigationTabs activeTab="publication" />);

    const publicationLink = screen.getByRole('link', { name: /by publication/i });
    const corpusLink = screen.getByRole('link', { name: /by corpus/i });

    expect(publicationLink).toHaveAttribute('aria-current', 'page');
    expect(publicationLink.className).toContain('font-semibold');
    expect(corpusLink).not.toHaveAttribute('aria-current');
  });
});
