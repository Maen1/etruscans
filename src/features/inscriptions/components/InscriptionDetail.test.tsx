import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import InscriptionDetail from './InscriptionDetail';
import DisambiguationView from './DisambiguationView';
import { InscriptionData } from '../schema';

describe('Inscription Views', () => {
  const mockRecord: InscriptionData = {
    tmId: 'TM 147310',
    metadata: { objectType: 'Cippus', language: 'Etruscan', isForgery: true },
    corpora: [
      { name: 'CIE', identifier: 'CIE 05039' },
      { name: 'Etruskische Texte', identifier: 'ET2 Vs 1.0138' }
    ],
    references: [
      { category: 'Squeezes', label: 'UUB 4134', uri: 'http://urn.kb.se/record-1' }
    ]
  };

  describe('InscriptionDetail', () => {
    it('renders metadata, forgery warning, and formatted Alvin links', () => {
      render(<InscriptionDetail record={mockRecord} />);

      // Core metadata
      expect(screen.getByText('TM 147310')).toBeInTheDocument();
      expect(screen.getByText(/Cippus/)).toBeInTheDocument();
      expect(screen.getByText(/Etruscan/)).toBeInTheDocument();
      
      // Forgery flag should be visible
      expect(screen.getByText(/Possible Forgery/i)).toBeInTheDocument();

      // Corpora
      expect(screen.getByText('CIE 05039')).toBeInTheDocument();
      expect(screen.getByText('ET2 Vs 1.0138')).toBeInTheDocument();

      // References (Alvin Links)
      const link = screen.getByRole('link', { name: 'UUB 4134' });
      expect(link).toHaveAttribute('href', 'http://urn.kb.se/record-1');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('DisambiguationView', () => {
    it('renders a list of links when multiple records match', () => {
      const records = [mockRecord, { ...mockRecord, tmId: 'TM 999999' }];
      render(<DisambiguationView records={records} query="CIE 131" />);

      expect(screen.getByText(/Multiple records found for "CIE 131"/)).toBeInTheDocument();
      
      const link1 = screen.getByRole('link', { name: /TM 147310/ });
      expect(link1).toHaveAttribute('href', '/text/TM 147310');

      const link2 = screen.getByRole('link', { name: /TM 999999/ });
      expect(link2).toHaveAttribute('href', '/text/TM 999999');
    });
  });
});
