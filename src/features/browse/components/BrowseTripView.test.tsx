import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BrowseTripView from './BrowseTripView';

describe('BrowseTripView', () => {
  it('renders heading and trip navigation tabs', () => {
    render(<BrowseTripView />);

    expect(screen.getByRole('heading', { level: 1, name: /material ordered according to trip/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /browse archive dimensions/i })).toBeInTheDocument();
  });

  it('renders provided item counts for trips', () => {
    const mockCounts = {
      'trip-1886': 18,
      'trip-1889': 1,
      'trip-1896': 0,
      'trip-1903': 4,
    };

    render(<BrowseTripView counts={mockCounts} />);

    expect(screen.getByText('18 items')).toBeInTheDocument();
    expect(screen.getByText('1 item')).toBeInTheDocument();
    expect(screen.getByText('4 items')).toBeInTheDocument();
  });
});
