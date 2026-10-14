import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BrowseIndexView from './BrowseIndexView';

describe('BrowseIndexView', () => {
  it('renders the header and navigation tabs', () => {
    render(<BrowseIndexView />);

    expect(screen.getByRole('heading', { level: 1, name: /browse the archive/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /browse archive dimensions/i })).toBeInTheDocument();
  });

  it('renders default zero item counts when no counts prop provided', () => {
    render(<BrowseIndexView />);

    const itemElements = screen.getAllByText('0 items');
    expect(itemElements.length).toBeGreaterThan(0);
  });

  it('renders provided item counts for corpora', () => {
    const mockCounts = {
      CIE: 42,
      'Etruskische Texte': 1,
      'CIL XI': 0,
    };

    render(<BrowseIndexView counts={mockCounts} />);

    expect(screen.getByText('42 items')).toBeInTheDocument();
    expect(screen.getByText('1 item')).toBeInTheDocument();
  });
});
