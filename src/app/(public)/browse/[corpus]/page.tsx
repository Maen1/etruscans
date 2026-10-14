import dbConnect from '@/lib/db';
import { Inscription } from '@/features/inscriptions/schema';
import { buildBrowseQuery } from '@/features/search/queries';
import BrowseCorpusView, { CorpusRecord } from '@/features/browse/components/BrowseCorpusView';

export default async function BrowseCorpusPage({
  params
}: {
  params: Promise<{ corpus: string }>;
}) {
  const resolvedParams = await params;
  const corpus = decodeURIComponent(resolvedParams.corpus);

  await dbConnect();
  
  const query = buildBrowseQuery(corpus);
  const records = (await Inscription.find(query)
    .sort({ 'corpora.identifier': 1 })
    .lean()) as unknown as CorpusRecord[];

  return <BrowseCorpusView corpus={corpus} records={records} />;
}
