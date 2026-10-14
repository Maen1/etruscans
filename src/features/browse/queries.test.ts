import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCorporaItemCounts, getTripItemCounts } from './queries';
import { Inscription } from '@/features/inscriptions/schema';

vi.mock('@/lib/db', () => ({
  default: vi.fn().mockResolvedValue(true)
}));

vi.mock('@/features/inscriptions/schema', () => ({
  Inscription: {
    aggregate: vi.fn(),
    countDocuments: vi.fn()
  }
}));

describe('Browse queries', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getCorporaItemCounts', () => {
    it('aggregates and maps counts for all requested corpora, defaulting missing to 0', async () => {
      vi.mocked(Inscription.aggregate).mockResolvedValueOnce([
        { _id: 'CIE', count: 25 },
        { _id: 'Etruskische Texte', count: 18 }
      ]);

      const result = await getCorporaItemCounts(['CIE', 'Etruskische Texte', 'CIL XI']);

      expect(result).toEqual({
        CIE: 25,
        'Etruskische Texte': 18,
        'CIL XI': 0
      });
      expect(Inscription.aggregate).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTripItemCounts', () => {
    it('queries countDocuments for each trip query and returns a keyed record', async () => {
      vi.mocked(Inscription.countDocuments)
        .mockResolvedValueOnce(12)
        .mockResolvedValueOnce(5);

      const trips = [
        { id: 'trip-1886', queryParam: 'Tarquinia' },
        { id: 'trip-1889', queryParam: 'Chiusi' }
      ];

      const result = await getTripItemCounts(trips);

      expect(result).toEqual({
        'trip-1886': 12,
        'trip-1889': 5
      });
      expect(Inscription.countDocuments).toHaveBeenCalledTimes(2);
    });
  });
});
