import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CorporaInfo } from './CorporaInfo';

describe('CorporaInfo', () => {
  it('renders corpora information', () => {
    render(<CorporaInfo />);
    expect(screen.getByText('About the corpora')).toBeInTheDocument();
    expect(screen.getAllByText(/Corpus Inscriptionum Etruscarum/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Etruskische Texte/)[0]).toBeInTheDocument();
  });
});
