import BrowseTripView, { HISTORICAL_TRIPS } from '@/features/browse/components/BrowseTripView';
import { getTripItemCounts } from '@/features/browse/queries';

export const metadata = {
  title: 'Material Ordered by Trip - Etruscans in the Archive',
  description: 'Browse epigraphic records and field notes organized by Danielsson’s research journeys.',
};

export const dynamic = 'force-dynamic';

export default async function BrowseTripPage() {
  const counts = await getTripItemCounts(HISTORICAL_TRIPS);
  return <BrowseTripView counts={counts} />;
}

