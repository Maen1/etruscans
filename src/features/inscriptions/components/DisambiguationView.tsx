import Link from 'next/link';
import { InscriptionData } from '../schema';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { formatInscriptionTitles } from '../utils';

export default function DisambiguationView({ records, query }: { records: InscriptionData[], query: string }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold font-heading">Disambiguation</CardTitle>
          <p className="text-muted-foreground text-sm">
            Multiple records found for &quot;{query}&quot;. Please select the specific inscription:
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {records.map((record) => {
              const { primaryTitle, subtitleCitations } = formatInscriptionTitles(record);
              return (
                <li key={record.tmId} className="border border-border p-4 rounded-lg hover:border-primary/50 hover:bg-muted/30 transition-colors card-hover">
                  <Link href={`/text/${record.tmId}`} className="block">
                    <div className="text-lg font-bold text-primary font-heading hover:underline">
                      {primaryTitle}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground mt-0.5">
                      {subtitleCitations}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <span className="font-medium text-foreground/80">Support:</span> {record.metadata.objectType || 'Unknown'} | <span className="font-medium text-foreground/80">Language:</span> {record.metadata.language || 'Unknown'}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
