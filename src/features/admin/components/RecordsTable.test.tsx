import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RecordsTable from './RecordsTable';
import { InscriptionData } from '../../inscriptions/schema';

describe('RecordsTable', () => {
  it('renders a table with correct columns and data rows', () => {
    const mockData: InscriptionData[] = [
      {
        tmId: 'TM 123',
        metadata: { objectType: 'Cippus', language: 'Etruscan', isForgery: false },
        corpora: [{ name: 'CIE', identifier: '123' }],
        references: [{ category: 'Squeezes', label: 'Sq 1', uri: 'http://sq.1' }]
      },
      {
        tmId: 'TM 456',
        metadata: { objectType: 'Tile', language: 'Latin', isForgery: true },
        corpora: [{ name: 'CIL XI', identifier: '456' }],
        references: []
      }
    ];

    render(<RecordsTable records={mockData} />);

    // Check Headers
    expect(screen.getByText('Trismegistos ID')).toBeInTheDocument();
    expect(screen.getByText('Object Type')).toBeInTheDocument();
    expect(screen.getByText('Language')).toBeInTheDocument();
    expect(screen.getByText('Corpora')).toBeInTheDocument();
    expect(screen.getByText('References Count')).toBeInTheDocument();

    // Check Row 1
    expect(screen.getByText('TM 123')).toBeInTheDocument();
    expect(screen.getByText('Cippus')).toBeInTheDocument();
    expect(screen.getByText('Etruscan')).toBeInTheDocument();
    expect(screen.getByText('CIE 123')).toBeInTheDocument(); // Formatted corpora
    expect(screen.getByText('1 refs')).toBeInTheDocument(); // Formatted ref count

    // Check Row 2
    expect(screen.getByText('TM 456')).toBeInTheDocument();
    expect(screen.getByText('Tile')).toBeInTheDocument();
    expect(screen.getByText('Latin')).toBeInTheDocument();
    expect(screen.getByText('CIL XI 456')).toBeInTheDocument();
    expect(screen.getByText('0 refs')).toBeInTheDocument();
  });
});
