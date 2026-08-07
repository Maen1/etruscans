import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { UnidentifiedList } from './UnidentifiedList';

vi.mock('@/lib/db', () => ({
  default: vi.fn().mockResolvedValue(true)
}));

vi.mock('@/features/inscriptions/schema', () => ({
  Inscription: {
    find: vi.fn().mockReturnValue({
      lean: vi.fn().mockResolvedValue([
        {
          _id: 'abc',
          tmId: '123',
          metadata: { objectType: 'Cippus' },
          corpora: [],
          references: []
        }
      ])
    })
  }
}));

describe('UnidentifiedList', () => {
  it('renders a list of unidentified inscriptions', async () => {
    // UnidentifiedList is an async component, so we have to resolve it first
    // Normally we'd use a server component testing utility, but for now we await the component itself
    const Component = await UnidentifiedList();
    render(Component);
    
    expect(screen.getByText('Unidentified Inscriptions')).toBeInTheDocument();
    expect(screen.getByText('TM 123')).toBeInTheDocument();
    expect(screen.getByText('Cippus')).toBeInTheDocument();
  });
});
