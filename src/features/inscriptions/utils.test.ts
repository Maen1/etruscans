import { describe, it, expect } from 'vitest';
import { stripLeadingZeros, formatInscriptionTitles, buildFlexibleZeroRegex } from './utils';

describe('stripLeadingZeros', () => {
  it('strips leading zeros after prefix in standard corpora citations', () => {
    expect(stripLeadingZeros('CIE 01136')).toBe('CIE 1136');
    expect(stripLeadingZeros('CIE 00886')).toBe('CIE 886');
    expect(stripLeadingZeros('CIE 0001')).toBe('CIE 1');
    expect(stripLeadingZeros('CIE 100')).toBe('CIE 100');
    expect(stripLeadingZeros('UUB 0591')).toBe('UUB 591');
    expect(stripLeadingZeros('CIL XI 0123')).toBe('CIL XI 123');
  });

  it('strips leading zeros after full stops in Etruskische Texte citations', () => {
    expect(stripLeadingZeros('ET2 Cl 1.0946')).toBe('ET2 Cl 1.946');
    expect(stripLeadingZeros('ET Cl 6.0001')).toBe('ET Cl 6.1');
    expect(stripLeadingZeros('ET Cl 1.946 + ET Cl 6.1')).toBe('ET Cl 1.946 + ET Cl 6.1');
    expect(stripLeadingZeros('ET Cl 1.0946 + ET Cl 6.0001')).toBe('ET Cl 1.946 + ET Cl 6.1');
  });

  it('handles empty, null, or non-numeric gracefully', () => {
    expect(stripLeadingZeros('')).toBe('');
    expect(stripLeadingZeros(undefined as unknown as string)).toBe('');
    expect(stripLeadingZeros('Unknown')).toBe('Unknown');
  });
});

describe('formatInscriptionTitles', () => {
  const sampleRecord = {
    tmId: '145502',
    corpora: [
      { name: 'CIE', identifier: 'CIE 01136' },
      { name: 'Etruskische Texte', identifier: 'ET Cl 1.0946' },
      { name: 'Etruskische Texte', identifier: 'ET Cl 6.0001' }
    ]
  };

  it('formats titles when browsing CIE', () => {
    const result = formatInscriptionTitles(sampleRecord, 'CIE');
    expect(result.primaryTitle).toBe('CIE 1136');
    expect(result.subtitleCitations).toBe('TM 145502. ET Cl 1.946 + ET Cl 6.1.');
  });

  it('formats titles when browsing Etruskische Texte', () => {
    const result = formatInscriptionTitles(sampleRecord, 'Etruskische Texte');
    expect(result.primaryTitle).toBe('ET Cl 1.946 + ET Cl 6.1');
    expect(result.subtitleCitations).toBe('TM 145502. CIE 1136.');
  });

  it('formats titles for global search (no active corpus)', () => {
    const result = formatInscriptionTitles(sampleRecord);
    expect(result.primaryTitle).toBe('CIE 1136');
    expect(result.subtitleCitations).toBe('TM 145502. ET Cl 1.946 + ET Cl 6.1.');
  });

  it('handles records with no corpora', () => {
    const noCorporaRecord = { tmId: '999999', corpora: [] };
    const result = formatInscriptionTitles(noCorporaRecord);
    expect(result.primaryTitle).toBe('TM 999999');
    expect(result.subtitleCitations).toBe('TM 999999.');
  });
});

describe('buildFlexibleZeroRegex', () => {
  it('creates regex pattern that matches both zero-padded and non-padded numbers', () => {
    const regex = new RegExp(buildFlexibleZeroRegex('CIE 1136'), 'i');
    expect(regex.test('CIE 1136')).toBe(true);
    expect(regex.test('CIE 01136')).toBe(true);
    expect(regex.test('CIE 001136')).toBe(true);
  });

  it('matches Etruskische Texte decimal numbers with or without padding', () => {
    const regex = new RegExp(buildFlexibleZeroRegex('1.946'), 'i');
    expect(regex.test('ET Cl 1.946')).toBe(true);
    expect(regex.test('ET Cl 1.0946')).toBe(true);
  });
});
