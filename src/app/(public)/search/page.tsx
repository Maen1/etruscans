import Link from 'next/link';
import dbConnect from '@/lib/db';
import { Inscription } from '@/features/inscriptions/schema';
import { buildSearchQuery } from '@/features/search/queries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const q = typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : '';

  await dbConnect();
  
  let records: any[] = [];
  
  if (q) {
    const query = buildSearchQuery(q);
    records = await Inscription.find(query).limit(50).lean();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      
      <form action="/search" method="GET" className="flex gap-2 mb-8 max-w-2xl">
        <input 
          type="search" 
          name="q" 
          defaultValue={q} 
          placeholder="Search for TM ID, Corpus (e.g. CIE 123), or keywords..." 
          className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-medium transition-colors">
          Search
        </button>
      </form>
      
      {q ? (
        <p className="text-slate-600 mb-6 font-medium">
          Found {records.length} {records.length === 1 ? 'record' : 'records'} for "{q}"
        </p>
      ) : (
        <p className="text-slate-600 mb-6 bg-indigo-50 p-4 rounded-md border border-indigo-100">
          Enter a search term above to begin. You can search by <strong>Trismegistos ID</strong> (e.g., 509373), <strong>Corpus</strong> (e.g., CIE 886), or other keywords.
        </p>
      )}

      <div className="space-y-4">
        {records.map((record) => (
          <Card key={record.tmId.toString()} className="hover:border-indigo-300 transition-colors">
            <Link href={`/text/${encodeURIComponent(record.tmId)}`} className="block">
              <CardHeader className="py-4">
                <CardTitle className="text-xl text-indigo-700">{record.tmId}</CardTitle>
                <div className="text-sm text-slate-500 mt-1">
                  Type: {record.metadata.objectType || 'Unknown'} | Language: {record.metadata.language || 'Unknown'}
                </div>
              </CardHeader>
              <CardContent className="py-0 pb-4">
                <div className="text-sm">
                  <strong>Corpora:</strong>{' '}
                  {record.corpora.map((c: any) => `${c.name} ${c.identifier}`).join(', ') || 'None'}
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
