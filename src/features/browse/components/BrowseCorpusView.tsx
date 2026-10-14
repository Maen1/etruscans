import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatInscriptionTitles } from '@/features/inscriptions/utils';

export interface CorpusRecord {
  tmId: string;
  metadata: {
    objectType?: string;
    language?: string;
    isForgery?: boolean;
  };
  corpora: Array<{
    name: string;
    identifier: string;
  }>;
  references?: Array<{
    category: string;
    label: string;
    uri?: string;
  }>;
}

interface BrowseCorpusViewProps {
  corpus: string;
  records: CorpusRecord[];
}

export default function BrowseCorpusView({ corpus, records }: BrowseCorpusViewProps) {
  if (records.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
        <h1 className="text-3xl font-bold mb-4 font-heading text-foreground">Corpus not found</h1>
        <p className="text-muted-foreground">No records found for corpus &quot;{corpus}&quot;.</p>
        <div className="mt-6">
          <Link href="/browse" className="text-primary hover:underline font-medium">
            &larr; Back to all corpora
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-border pb-4">
        <div>
          <Link href="/browse" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors mb-1 inline-block">
            &larr; All Corpora
          </Link>
          <h1 className="text-3xl font-extrabold font-heading text-foreground">
            Browsing: {corpus}
          </h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{records.length}</span> {records.length === 1 ? 'record' : 'records'}
        </p>
      </div>

      <div className="space-y-4">
        {records.map((record) => {
          const { primaryTitle, subtitleCitations } = formatInscriptionTitles(record, corpus);
          
          // Unique categories in references for badge highlights
          const categories = Array.from(
            new Set(record.references?.map((r) => r.category).filter(Boolean) || [])
          );

          return (
            <Card key={record.tmId} className="card-hover border-border/80 hover:border-primary/40 group">
              <Link href={`/text/${encodeURIComponent(record.tmId)}`} className="block">
                <CardHeader className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      {/* Prominent Corpus Title */}
                      <CardTitle className="text-xl sm:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors font-heading">
                        {primaryTitle}
                      </CardTitle>
                      {/* Secondary line: TM ID and other corpus citations */}
                      <p className="text-sm font-medium text-muted-foreground mt-1 font-mono tracking-tight">
                        {subtitleCitations}
                      </p>
                    </div>

                    {record.metadata.isForgery && (
                      <span className="text-xs font-semibold text-destructive bg-destructive/10 px-2.5 py-1 rounded-full whitespace-nowrap border border-destructive/20 shrink-0 self-start">
                        ⚠️ Possible Forgery
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>
                      <strong className="text-foreground/80 font-medium">Support:</strong> {record.metadata.objectType || 'Unknown'}
                    </span>
                    <span>
                      <strong className="text-foreground/80 font-medium">Language:</strong> {record.metadata.language || 'Unknown'}
                    </span>
                  </div>
                </CardHeader>

                {categories.length > 0 && (
                  <CardContent className="py-0 pb-4 pt-0">
                    <div className="flex flex-wrap gap-1.5 items-center">
                      <span className="text-xs text-muted-foreground/80 mr-1">Archive items:</span>
                      {categories.map((category) => (
                        <span
                          key={category}
                          className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border border-border/50"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
