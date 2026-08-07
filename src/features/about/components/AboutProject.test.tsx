import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutProject } from './AboutProject';

describe('AboutProject', () => {
  it('renders about information', () => {
    render(<AboutProject />);
    expect(screen.getByText('About the Project')).toBeInTheDocument();
    expect(screen.getByText(/What this database is/)).toBeInTheDocument();
  });
});
