import Link from 'next/link';
import { Suspense } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatInscriptionTitles } from '@/features/inscriptions/utils';
import ExtendedSearchFilters from './ExtendedSearchFilters';

export interface SearchRecord {
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

interface SearchResultsViewProps {
  query: string;
  records: SearchRecord[];
  activeCorpus?: string;
}

export default function SearchResultsView({
  query,
  records,
  activeCorpus
}: SearchResultsViewProps) {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold font-heading text-foreground mb-2">
          Search Database
        </h1>
        <p className="text-muted-foreground text-sm">
          Search across epigraphic corpora, Trismegistos identifiers, and archival facsimile materials.
        </p>
      </div>

      <Suspense fallback={<div className="h-16 bg-muted animate-pulse rounded-xl mb-8"></div>}>
        <ExtendedSearchFilters />
      </Suspense>

      {query ? (
        <p className="text-muted-foreground mb-6 font-medium text-sm">
          Found <span className="font-bold text-foreground">{records.length}</span>{' '}
          {records.length === 1 ? 'record' : 'records'}.
        </p>
      ) : records.length > 0 ? (
        <p className="text-muted-foreground mb-6 font-medium text-sm">
          Showing <span className="font-bold text-foreground">{records.length}</span> filtered{' '}
          {records.length === 1 ? 'record' : 'records'}.
        </p>
      ) : (
        <div className="text-center py-12 border border-dashed border-border rounded-xl bg-card/50">
          <p className="text-muted-foreground font-medium">
            No matching inscriptions found. Try adjusting your search term or clearing some filters.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {records.map((record) => {
          const { primaryTitle, subtitleCitations } = formatInscriptionTitles(record, activeCorpus);
          const categories = Array.from(
            new Set(record.references?.map((r) => r.category).filter(Boolean) || [])
          );

          return (
            <Card key={record.tmId} className="card-hover border-border/80 hover:border-primary/40 group">
              <Link href={`/text/${encodeURIComponent(record.tmId)}`} className="block">
                <CardHeader className="py-4">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div>
                      {/* Corpus Identifier Title */}
                      <CardTitle className="text-xl sm:text-2xl font-bold text-primary group-hover:text-primary/80 transition-colors font-heading">
                        {primaryTitle}
                      </CardTitle>
                      {/* TM ID & Other Corpora Citations */}
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
                      <strong className="text-foreground/80 font-medium">Support:</strong>{' '}
                      {record.metadata.objectType || 'Unknown'}
                    </span>
                    <span>
                      <strong className="text-foreground/80 font-medium">Language:</strong>{' '}
                      {record.metadata.language || 'Unknown'}
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
