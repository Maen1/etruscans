import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import BrowseCorpusView from './BrowseCorpusView';

describe('BrowseCorpusView', () => {
  const mockRecords = [
    {
      tmId: '145502',
      metadata: { objectType: 'Cippus', language: 'Etruscan', isForgery: false },
      corpora: [
        { name: 'CIE', identifier: 'CIE 01136' },
        { name: 'Etruskische Texte', identifier: 'ET2 Cl 1.0946' },
        { name: 'Etruskische Texte', identifier: 'ET2 Cl 6.0001' }
      ],
      references: [
        { category: 'Squeezes', label: 'UUB 0591', uri: 'http://urn.kb.se/1' }
      ]
    }
  ];

  it('renders corpus identifier as primary title and TM/other corpora in subtitle', () => {
    render(<BrowseCorpusView corpus="CIE" records={mockRecords} />);

    // Primary title should be CIE 1136 (stripped leading zero)
    expect(screen.getByText('CIE 1136')).toBeInTheDocument();

    // Subtitle should have TM and other corpora joined
    expect(screen.getByText('TM 145502. ET2 Cl 1.946 + ET2 Cl 6.1.')).toBeInTheDocument();
  });

  it('renders ET as primary title when browsing Etruskische Texte', () => {
    render(<BrowseCorpusView corpus="Etruskische Texte" records={mockRecords} />);

    // Primary title should be the ET citations combined
    expect(screen.getByText('ET2 Cl 1.946 + ET2 Cl 6.1')).toBeInTheDocument();

    // Subtitle should have TM and CIE
    expect(screen.getByText('TM 145502. CIE 1136.')).toBeInTheDocument();
  });

  it('renders empty state when no records found', () => {
    render(<BrowseCorpusView corpus="NonExistent" records={[]} />);
    expect(screen.getByText('Corpus not found')).toBeInTheDocument();
  });
});
