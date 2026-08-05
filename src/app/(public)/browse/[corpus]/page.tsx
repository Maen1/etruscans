import Link from 'next/link';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import { Inscription } from '@/features/inscriptions/schema';
import { buildBrowseQuery } from '@/features/search/queries';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function BrowseCorpusPage({ params }: { params: Promise<{ corpus: string }> }) {
  const resolvedParams = await params;
  const corpus = decodeURIComponent(resolvedParams.corpus);

  await dbConnect();
  
  const query = buildBrowseQuery(corpus);
  const records = await Inscription.find(query).sort({ 'corpora.identifier': 1 }).lean();

  if (records.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4">Corpus not found</h1>
        <p className="text-slate-600">No records found for corpus "{corpus}".</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Browsing Corpus: {corpus}</h1>
      
      <p className="text-slate-600 mb-6">
        Showing {records.length} {records.length === 1 ? 'record' : 'records'}.
      </p>

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
