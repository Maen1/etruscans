import BrowseIndexView, { CORPORA } from '@/features/browse/components/BrowseIndexView';
import { getCorporaItemCounts } from '@/features/browse/queries';

export const metadata = {
  title: 'Browse - Etruscans in the Archive',
  description: 'Browse the Danielsson epigraphic archive by corpus, trip, or publication.',
};

export const dynamic = 'force-dynamic';

export default async function BrowsePage() {
  const counts = await getCorporaItemCounts(CORPORA.map((c) => c.name));
  return <BrowseIndexView counts={counts} />;
}

