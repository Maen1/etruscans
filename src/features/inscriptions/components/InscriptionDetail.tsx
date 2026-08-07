import Link from 'next/link';
import { InscriptionData } from '../schema';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function InscriptionDetail({ record }: { record: InscriptionData }) {
  const groupedRefs = record.references.reduce((acc: Record<string, any[]>, ref) => {
    if (!acc[ref.category]) acc[ref.category] = [];
    acc[ref.category].push(ref);
    return acc;
  }, {});

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center flex-wrap">
              <Link 
                href={record.tmUrl || `/text/${record.tmId}`} 
                target={record.tmUrl ? "_blank" : undefined}
                className="hover:underline"
              >
                {record.tmId}
              </Link>
              {record.corpora.map((corpus, i) => (
                <span key={i}>
                  <span className="mx-2 text-slate-400">=</span>
                  <Link href={`/browse/${corpus.name}`} className="hover:underline">
                    {corpus.identifier}
                  </Link>
                </span>
              ))}
            </div>
            {record.metadata.isForgery && (
              <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full whitespace-nowrap">
                ⚠️ Possible Forgery
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-500">Object Type</h3>
              <p className="text-lg">{record.metadata.objectType || 'Unknown'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-500">Language</h3>
              <p className="text-lg">{record.metadata.language || 'Unknown'}</p>
            </div>
          </div>

          {Object.keys(groupedRefs).length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-500 mb-4 border-b pb-2">Archive References</h3>
              <div className="space-y-4">
                {Object.entries(groupedRefs).map(([category, refs]) => (
                  <div key={category} className="leading-relaxed">
                    <span className="font-semibold text-slate-900 mr-2">{category}</span>
                    {refs.map((ref: any, i: number) => (
                      <span key={i}>
                        <a 
                          href={ref.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-800 hover:underline break-all"
                        >
                          {ref.label}
                        </a>
                        {i < refs.length - 1 ? '; ' : '.'}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
