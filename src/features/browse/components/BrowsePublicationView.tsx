import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen, ArrowRight, Library } from 'lucide-react';
import { BrowseNavigationTabs } from './BrowseNavigationTabs';

export interface PublicationGroup {
  name: string;
  shortCode: string;
  description: string;
  details: string;
  corpusQuery: string;
}

export const PUBLICATIONS: PublicationGroup[] = [
  {
    name: 'Corpus Inscriptionum Etruscarum (CIE)',
    shortCode: 'CIE',
    description: 'The monumental international corpus of Etruscan inscriptions, co-edited by O. A. Danielsson, C. Pauli, and G. Herbig.',
    details: 'Includes Vol. I (Tituli 1–4917: Faesulae, Arretium, Clusium) and Vol. II (Perusia, Tarquinii, etc.).',
    corpusQuery: 'CIE'
  },
  {
    name: 'Etruskische Texte (ET)',
    shortCode: 'ET',
    description: 'The standard modern reference edition by Helmut Rix (ET1, 1991) and Gerhard Meiser (ET2, 2014).',
    details: 'Arranged topographically by ancient region codes (e.g. Cl = Clusium, Vs = Volsinii, Cr = Caere).',
    corpusQuery: 'Etruskische Texte'
  },
  {
    name: 'Corpus Inscriptionum Latinarum (CIL XI)',
    shortCode: 'CIL XI',
    description: 'Inscriptiones Aemiliae, Etruriae et Umbriae Latinae (E. Bormann).',
    details: 'Latin and bilingual inscriptions of Central and Northern Italy.',
    corpusQuery: 'CIL XI'
  },
  {
    name: 'CIL (Other Volumes)',
    shortCode: 'CIL',
    description: 'Additional volumes of the Berlin Latin Inscriptions corpus.',
    details: 'Includes CIL I² (Inscriptiones Latinae Antiquissimae) and provincial volumes.',
    corpusQuery: 'CIL (other)'
  },
  {
    name: 'Imagines Italicae',
    shortCode: 'II',
    description: 'Michael H. Crawford et al. (London, 2011).',
    details: 'Photographic and epigraphic corpus of the non-Latin languages of ancient Italy.',
    corpusQuery: 'Imagines Italicae'
  },
  {
    name: 'Sabellische Texte',
    shortCode: 'ST',
    description: 'H. Rix (Heidelberg, 2002).',
    details: 'Oscan, Umbrian, and South Picene epigraphic material.',
    corpusQuery: 'Sabellische Texte'
  },
  {
    name: 'The Latin Dialect of the Ager Faliscus',
    shortCode: 'Bakkum',
    description: 'G. C. L. M. Bakkum (Amsterdam, 2009).',
    details: 'Comprehensive catalogue of Faliscan inscriptions and linguistic commentary.',
    corpusQuery: 'Bakkum'
  },
  {
    name: 'La lingua venetica',
    shortCode: 'LLV',
    description: 'G. B. Pellegrini & A. L. Prosdocimi (Padova, 1967).',
    details: 'Corpus and linguistic grammar of Venetic inscriptions.',
    corpusQuery: 'Pellegrini & Prosdocimi, La Lingua venetica'
  },
  {
    name: 'Other Publications',
    shortCode: 'Misc',
    description: 'Specialist journals, museum catalogues, and standalone epigraphic articles.',
    details: 'Studi Etruschi, Notizie degli Scavi, and regional archaeological museum monographs.',
    corpusQuery: 'Other publications'
  }
];

interface BrowsePublicationViewProps {
  counts?: Record<string, number>;
}

export default function BrowsePublicationView({ counts = {} }: BrowsePublicationViewProps) {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          <Library className="w-4 h-4" />
          <span>Epigraphic Bibliography</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight font-heading text-foreground mb-3">
          Material Ordered According to Publication
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
          Browse inscriptions organized by their primary published editions, corpora, and scholarly volumes.
        </p>

        {/* View Switcher Tabs */}
        <div className="flex justify-center">
          <BrowseNavigationTabs activeTab="publication" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PUBLICATIONS.map((pub) => {
          const count = counts[pub.corpusQuery] ?? 0;
          return (
            <Link
              key={pub.shortCode}
              href={`/browse/${encodeURIComponent(pub.corpusQuery)}`}
              className="group"
            >
              <Card className="h-full border-border/80 card-hover flex flex-col justify-between group-hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-muted text-primary border border-border">
                      {pub.shortCode}
                    </span>
                    <BookOpen className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <CardTitle className="text-lg font-bold font-heading text-foreground group-hover:text-primary transition-colors">
                    {pub.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {pub.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-xs text-muted-foreground border-t border-border/50 pt-3 flex items-center justify-between">
                    <span className="font-medium text-foreground">
                      {count.toLocaleString()} {count === 1 ? 'item' : 'items'}
                    </span>
                    <span className="inline-flex items-center text-primary font-medium group-hover:translate-x-0.5 transition-transform">
                      Browse edition <ArrowRight className="w-3.5 h-3.5 ml-1" />
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

