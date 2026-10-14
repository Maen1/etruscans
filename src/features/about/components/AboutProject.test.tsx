import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutProject } from './AboutProject';

describe('AboutProject', () => {
  it('renders about information and contributor gallery', () => {
    render(<AboutProject />);
    expect(screen.getByRole('heading', { level: 1, name: /About the Project & the Archive/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'The Archive' })).toBeInTheDocument();
    expect(screen.getAllByText(/Olof August Danielsson/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/What this database is/i)).toBeInTheDocument();
  });
});
