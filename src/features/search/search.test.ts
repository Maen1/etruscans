import { describe, it, expect } from 'vitest';
import { buildSearchQuery, buildBrowseQuery } from './queries';

describe('Search & Browse Queries', () => {
  describe('buildSearchQuery', () => {
    it('returns empty query if search term is empty', () => {
      const q = buildSearchQuery('');
      expect(q).toEqual({});
    });

    it('returns a query that matches tmId or corpora identifier using regex for partial matches', () => {
      const q = buildSearchQuery('CIE 123');
      expect(q).toEqual({
        $or: [
          { tmId: { $regex: 'CIE 123', $options: 'i' } },
          { 'corpora.identifier': { $regex: 'CIE 123', $options: 'i' } },
          { 'references.label': { $regex: 'CIE 123', $options: 'i' } }
        ]
      });
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
