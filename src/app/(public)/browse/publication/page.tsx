import BrowsePublicationView, { PUBLICATIONS } from '@/features/browse/components/BrowsePublicationView';
import { getCorporaItemCounts } from '@/features/browse/queries';

export const metadata = {
  title: 'Material Ordered by Publication - Etruscans in the Archive',
  description: 'Browse epigraphic records organized by publication editions and corpora.',
};

export const dynamic = 'force-dynamic';

export default async function BrowsePublicationPage() {
  const counts = await getCorporaItemCounts(PUBLICATIONS.map((p) => p.corpusQuery));
  return <BrowsePublicationView counts={counts} />;
}

