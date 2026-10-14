import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BrowsePublicationView from './BrowsePublicationView';

describe('BrowsePublicationView', () => {
  it('renders heading and publication navigation tabs', () => {
    render(<BrowsePublicationView />);

    expect(screen.getByRole('heading', { level: 1, name: /material ordered according to publication/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /browse archive dimensions/i })).toBeInTheDocument();
  });

  it('renders provided item counts for publications', () => {
    const mockCounts = {
      CIE: 55,
      'Etruskische Texte': 1,
      'CIL XI': 0,
    };

    render(<BrowsePublicationView counts={mockCounts} />);

    expect(screen.getByText('55 items')).toBeInTheDocument();
    expect(screen.getByText('1 item')).toBeInTheDocument();
  });
});
