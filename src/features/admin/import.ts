import { InscriptionData } from '../inscriptions/schema';
import { parse } from 'csv-parse/sync';

const CATEGORY_MAP: Record<string, string> = {
  'Squeeze ': 'Squeezes',
  'Rubbing ': 'Rubbings',
  'Tracing ': 'Tracings',
  'Plaster cast ': 'Plaster Casts',
  'Drawing/painting ': 'Drawings/Paintings',
  'Photograph ': 'Photographs',
  'Autopsy ': 'Autopsy Notes',
  'Not autopsy ': 'Notes (Non-Autopsy)',
  'Notes & discussion ': 'Notes & Discussion',
  'Manuscript ': 'Manuscripts',
  'Proofs ': 'Proofs',
  'Mention ': 'Mentions'
};

const CORPORA_HEADERS = ['Trismegistos', 'CIE', 'Etruskische Texte', 'CIL XI', 'CIL (other)', 'Imagines Italicae', 'Sabellische Texte', 'Bakkum', 'Pellegrini & Prosdocimi, La Lingua venetica', 'Other publications'];

export async function parseInscriptionsCsv(csvContent: string): Promise<InscriptionData[]> {
  const records = parse(csvContent, { skip_empty_lines: true }) as string[][];
  if (records.length < 2) return [];

  const headers = records[0];
  const results: InscriptionData[] = [];

  for (let r = 1; r < records.length; r++) {
    const row = records[r];
    const item: InscriptionData = {
      tmId: '',
      metadata: { isForgery: false },
      corpora: [],
      references: []
    };

    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]?.trim();
      const value = row[i]?.trim();

      if (!value || value === 'None') continue;

      if (header === 'Trismegistos') {
        item.tmId = value;
      } else if (CORPORA_HEADERS.includes(header) && header !== 'Trismegistos') {
        item.corpora.push({ name: header, identifier: value });
      } else if (header === 'Epigraphic support') {
        item.metadata.objectType = value;
      } else if (header === 'Language') {
        item.metadata.language = value;
      } else {
        // Check for reference pairs
        for (const [prefix, category] of Object.entries(CATEGORY_MAP)) {
          if (header.startsWith(prefix)) {
            // Is it a paired column?
            if (headers[i] === headers[i + 1]) {
              const uri = row[i + 1]?.trim();
              if (uri && uri !== 'None') {
                item.references.push({ category, label: value, uri });
              }
              i++; // Skip the URI column
            }
            break;
          }
        }
      }
    }
    results.push(item);
  }
  return results;
}
