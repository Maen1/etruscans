import { describe, it, expect } from 'vitest';
import { buildSearchQuery, buildBrowseQuery } from './queries';

describe('Search & Browse Queries', () => {
  describe('buildSearchQuery', () => {
    it('returns empty query if search term and filters are empty', () => {
      const q = buildSearchQuery('');
      expect(q).toEqual({});
    });

    it('returns a query that matches tmId or corpora identifier with flexible zero regex', () => {
      const q = buildSearchQuery('CIE 123') as any;
      expect(q).toHaveProperty('$or');
      expect(q.$or).toHaveLength(3);
      expect(q.$or[0].tmId.$regex).toBeDefined();
      expect(q.$or[1]['corpora.identifier'].$regex).toBeDefined();
      expect(q.$or[2]['references.label'].$regex).toBeDefined();
    });

    it('filters by corpus', () => {
      const q = buildSearchQuery('', { corpus: 'CIE' });
      expect(q).toEqual({ 'corpora.name': 'CIE' });
    });

    it('filters by epigraphic support', () => {
      const q = buildSearchQuery('', { support: 'Cippus' });
      expect(q).toEqual({ 'metadata.objectType': { $regex: 'Cippus', $options: 'i' } });
    });

    it('filters by reference category (e.g. Squeezes)', () => {
      const q = buildSearchQuery('', { category: 'Squeezes' });
      expect(q).toEqual({ 'references.category': { $in: ['Squeezes'] } });
    });

    it('combines text search with multiple filters using $and', () => {
      const q = buildSearchQuery('1136', { corpus: 'CIE', category: ['Squeezes', 'Photographs'] }) as any;
      expect(q).toHaveProperty('$and');
      expect(q.$and).toHaveLength(3);
      expect(q.$and[1]).toEqual({ 'corpora.name': 'CIE' });
      expect(q.$and[2]).toEqual({ 'references.category': { $in: ['Squeezes', 'Photographs'] } });
    });
  });

  describe('buildBrowseQuery', () => {
    it('builds a query to exactly match a corpus name', () => {
      const q = buildBrowseQuery('CIE');
      expect(q).toEqual({
        'corpora.name': 'CIE'
      });
    });
  });
});
