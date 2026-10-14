import dbConnect from '@/lib/db';
import { Inscription } from '@/features/inscriptions/schema';
import { buildSearchQuery } from '@/features/search/queries';

export async function getCorporaItemCounts(
  corporaNames: string[]
): Promise<Record<string, number>> {
  await dbConnect();

  const results = await Inscription.aggregate([
    { $unwind: '$corpora' },
    { $match: { 'corpora.name': { $in: corporaNames } } },
    { $group: { _id: { tmId: '$tmId', name: '$corpora.name' } } },
    { $group: { _id: '$_id.name', count: { $sum: 1 } } }
  ]);

  const map: Record<string, number> = {};
  for (const name of corporaNames) {
    map[name] = 0;
  }
  for (const row of results) {
    map[row._id] = row.count;
  }

  return map;
}

export async function getTripItemCounts(
  trips: Array<{ id: string; queryParam: string }>
): Promise<Record<string, number>> {
  await dbConnect();

  const entries = await Promise.all(
    trips.map(async (trip) => {
      const q = buildSearchQuery(trip.queryParam);
      const count = await Inscription.countDocuments(q);
      return [trip.id, count] as const;
    })
  );

  return Object.fromEntries(entries);
}
