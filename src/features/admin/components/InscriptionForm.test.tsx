import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InscriptionForm } from './InscriptionForm';

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() })
}));

describe('InscriptionForm', () => {
  it('renders a new inscription form', () => {
    render(<InscriptionForm />);
    expect(screen.getByText('New Inscription')).toBeInTheDocument();
    expect(screen.getByText('Base Details')).toBeInTheDocument();
  });

  it('renders an edit inscription form with initial data', () => {
    const mockData = {
      _id: '123',
      tmId: 'TM 12345',
      metadata: { isForgery: false, objectType: 'Cippus', language: 'Etruscan' },
      corpora: [],
      references: []
    };
    render(<InscriptionForm initialData={mockData} />);
    expect(screen.getByText('Edit Inscription')).toBeInTheDocument();
    expect(screen.getByDisplayValue('TM 12345')).toBeInTheDocument();
  });
});
