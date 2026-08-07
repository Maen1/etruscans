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
                  <span className="mx-2 text-muted-foreground/50">=</span>
                  <Link href={`/browse/${corpus.name}`} className="text-primary hover:underline transition-colors">
                    {corpus.identifier}
                  </Link>
                </span>
              ))}
            </div>
            {record.metadata.isForgery && (
              <span className="text-sm font-semibold text-destructive bg-destructive/10 px-3 py-1 rounded-full whitespace-nowrap border border-destructive/20 shadow-sm">
                ⚠️ Possible Forgery
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Object Type</h3>
              <p className="text-lg font-medium">{record.metadata.objectType || 'Unknown'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider">Language</h3>
              <p className="text-lg font-medium">{record.metadata.language || 'Unknown'}</p>
            </div>
          </div>

          {Object.keys(groupedRefs).length > 0 && (
            <div>
              <h3 className="font-semibold text-muted-foreground text-sm uppercase tracking-wider mb-4 border-b border-border pb-2">Archive References</h3>
              <div className="space-y-4">
                {Object.entries(groupedRefs).map(([category, refs]) => (
                  <div key={category} className="leading-relaxed">
                    <span className="font-semibold text-foreground mr-2">{category}</span>
                    {refs.map((ref: any, i: number) => (
                      <span key={i}>
                        <a 
                          href={ref.uri} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-secondary hover:underline break-all transition-colors font-medium"
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
