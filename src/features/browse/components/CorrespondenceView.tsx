import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Mail, ArrowRight, UserCheck, FileText } from 'lucide-react';

interface Correspondent {
  name: string;
  role: string;
  period: string;
  description: string;
  searchFilter: string;
}

const KEY_CORRESPONDENTS: Correspondent[] = [
  {
    name: 'Carl Pauli (1839–1901)',
    role: 'Founder & Co-Editor of CIE',
    period: '1885–1901',
    description: 'Extensive correspondence regarding the foundation of the Corpus Inscriptionum Etruscarum, division of regional fascicles, and readings of newly discovered Etruscan texts.',
    searchFilter: 'Pauli'
  },
  {
    name: 'Gustav Herbig (1868–1925)',
    role: 'Co-Editor of CIE (Munich/Rostock)',
    period: '1898–1925',
    description: 'Scholarly letters discussing phonology, Etruscan grammatical structures, autopsy collations in Tarquinia, and the preparation of CIE Vol. II.',
    searchFilter: 'Herbig'
  },
  {
    name: 'Eugen Bormann (1842–1917)',
    role: 'Editor of CIL XI (Vienna)',
    period: '1888–1912',
    description: 'Exchanges on Latin and bilingual Etruscan-Latin inscriptions of Umbria and Etruria, monument conservation, and archival squeezes.',
    searchFilter: 'Bormann'
  },
  {
    name: 'Torsten Brorström (1870–1935)',
    role: 'Archive Collaborator & Philologist',
    period: '1905–1928',
    description: 'Letters, squeeze inventories, and collations of Danielsson’s manuscript notebooks at Uppsala University Library.',
    searchFilter: 'Brorström'
  }
];

export default function CorrespondenceView() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          <Mail className="w-4 h-4" />
          <span>Epistolary Archives</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight font-heading text-foreground mb-3">
          Scholarly Correspondence
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          The Danielsson Archive contains extensive correspondence with 19th and early 20th-century European epigraphists, philologists, and museum curators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {KEY_CORRESPONDENTS.map((corr) => (
          <Card key={corr.name} className="border-border/80 card-hover flex flex-col justify-between">
            <CardHeader>
              <div className="flex items-center justify-between text-xs text-muted-foreground font-medium mb-1">
                <span>Active Period: {corr.period}</span>
                <UserCheck className="w-3.5 h-3.5 text-primary" />
              </div>
              <CardTitle className="text-xl font-bold font-heading text-foreground">
                {corr.name}
              </CardTitle>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-0.5">
                {corr.role}
              </p>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {corr.description}
              </p>
              <Link
                href={`/search?q=${encodeURIComponent(corr.searchFilter)}`}
                className="inline-flex items-center text-sm font-semibold text-primary hover:underline group"
              >
                <span>Search references & mentions ({corr.searchFilter})</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/30 border border-border rounded-xl p-6">
        <h3 className="text-lg font-bold font-heading text-foreground mb-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary" />
          Correspondence in Alvin Digital Repository
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          All letters, letterbooks, and correspondence files in Danielsson’s Nachlass are catalogued at Uppsala University Library. Inscriptions with accompanying letters or epistolary citations can be queried directly via our search tool.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/search?category=Mentions"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <span>View Inscriptions with Archive Mentions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/search?category=Manuscripts"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/90 transition-colors"
          >
            <span>View Inscriptions with Manuscript Notes</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
