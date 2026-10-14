import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { BrowseNavigationTabs } from './BrowseNavigationTabs';

export const CORPORA = [
  { name: 'CIE', description: 'Corpus Inscriptionum Etruscarum' },
  { name: 'Etruskische Texte', description: 'Rix & Meiser Edition' },
  { name: 'CIL XI', description: 'Corpus Inscriptionum Latinarum Vol. 11' },
  { name: 'CIL (other)', description: 'Other CIL volumes' },
  { name: 'Imagines Italicae', description: 'Crawford Edition' },
  { name: 'Sabellische Texte', description: 'Rix Edition' },
  { name: 'Bakkum', description: 'Latin Dialect of the Ager Faliscus' },
  { name: 'Pellegrini & Prosdocimi, La Lingua venetica', description: 'Venetic inscriptions' },
  { name: 'Other publications', description: 'Miscellaneous collections' },
];

interface BrowseIndexViewProps {
  counts?: Record<string, number>;
}

export default function BrowseIndexView({ counts = {} }: BrowseIndexViewProps) {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          <BookOpen className="w-4 h-4" />
          <span>Epigraphic Corpora</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight font-heading text-foreground mb-3">
          Browse the Archive
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6">
          Explore the digitised materials through multiple organizational frameworks.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex justify-center">
          <BrowseNavigationTabs activeTab="corpus" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CORPORA.map((corpus) => {
          const count = counts[corpus.name] ?? 0;
          return (
            <Link href={`/browse/${encodeURIComponent(corpus.name)}`} key={corpus.name}>
              <Card className="h-full border-border/80 card-hover group hover:border-primary/50 transition-all flex flex-col justify-between">
                <CardHeader>
                  <CardTitle className="text-xl font-bold font-heading text-primary group-hover:text-primary/80 flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary/70 shrink-0" />
                    {corpus.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 leading-relaxed text-sm">
                    {corpus.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground border-t border-border/50 pt-3 flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {count.toLocaleString()} {count === 1 ? 'item' : 'items'}
                    </span>
                    <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-0.5 transition-transform">
                      Explore &rarr;
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

