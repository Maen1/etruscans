import dbConnect from '@/lib/db';
import { Inscription } from '@/features/inscriptions/schema';
import { buildSearchQuery, SearchFilters } from '@/features/search/queries';
import SearchResultsView, { SearchRecord } from '@/features/search/components/SearchResultsView';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : '';
  const corpus = typeof params.corpus === 'string' ? params.corpus : undefined;
  const support = typeof params.support === 'string' ? params.support : undefined;
  const language = typeof params.language === 'string' ? params.language : undefined;
  const category = params.category as string | string[] | undefined;
  const forgery = typeof params.forgery === 'string' ? params.forgery : undefined;

  const filters: SearchFilters = { corpus, support, language, category, isForgery: forgery };

  await dbConnect();
  
  const query = buildSearchQuery(q, filters);
  const records = Object.keys(query).length > 0
    ? ((await Inscription.find(query).limit(100).lean()) as unknown as SearchRecord[])
    : [];

  return <SearchResultsView query={q} records={records} activeCorpus={corpus} />;
}
