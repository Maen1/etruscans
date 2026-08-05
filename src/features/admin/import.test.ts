import { describe, it, expect } from 'vitest';
import { parseInscriptionsCsv } from './import';

describe('parseInscriptionsCsv', () => {
  it('should parse a row with corpora, metadata, and dynamic paired references', async () => {
    const csvContent = `Trismegistos,CIE,Etruskische Texte,Epigraphic support,Language,Squeeze 1,Squeeze 1,Rubbing 1,Rubbing 1,Tracing 1,Tracing 1,Plaster cast 1,Plaster cast 1,Drawing/painting 1,Drawing/painting 1,Photograph 1,Photograph 1,Autopsy 1,Autopsy 1,Not autopsy 1,Not autopsy 1,Notes & discussion 1,Notes & discussion 1,Manuscript 1,Manuscript 1,Proofs 1,Proofs 1,Mention 1,Mention 1
TM 147310,CIE 05039,ET2 Vs 1.0138,Cippus,Etruscan,UUB 4134,http://s.se/1,Rub 1,http://r.se/1,Trac 1,http://t.se/1,Plas 1,http://p.se/1,Draw 1,http://d.se/1,Phot 1,http://ph.se/1,Aut 1,http://a.se/1,Not 1,http://n.se/1,Notes 1,http://no.se/1,Man 1,http://m.se/1,Pro 1,http://pr.se/1,Men 1,http://me.se/1`;

    const result = await parseInscriptionsCsv(csvContent);

    expect(result).toHaveLength(1);
    const item = result[0];

    expect(item.tmId).toBe('TM 147310');
    expect(item.metadata.objectType).toBe('Cippus');
    expect(item.metadata.language).toBe('Etruscan');
    
    expect(item.corpora).toContainEqual({ name: 'CIE', identifier: 'CIE 05039' });
    expect(item.corpora).toContainEqual({ name: 'Etruskische Texte', identifier: 'ET2 Vs 1.0138' });

    const categories = item.references.map(r => r.category);
    expect(categories).toContain('Squeezes');
    expect(categories).toContain('Rubbings');
    expect(categories).toContain('Tracings');
    expect(categories).toContain('Plaster Casts');
    expect(categories).toContain('Drawings/Paintings');
    expect(categories).toContain('Photographs');
    expect(categories).toContain('Autopsy Notes');
    expect(categories).toContain('Notes (Non-Autopsy)');
    expect(categories).toContain('Notes & Discussion');
    expect(categories).toContain('Manuscripts');
    expect(categories).toContain('Proofs');
    expect(categories).toContain('Mentions');
  });
});
