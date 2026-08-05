import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const CORPORA = [
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

export default function BrowsePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
          Browse by Corpus
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore inscriptions categorized by their published editions and major epigraphic corpora.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {CORPORA.map((corpus) => (
          <Link href={`/browse/${encodeURIComponent(corpus.name)}`} key={corpus.name}>
            <Card className="h-full hover:border-indigo-400 hover:shadow-md transition-all group">
              <CardHeader>
                <CardTitle className="text-xl text-indigo-700 group-hover:text-indigo-800 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-indigo-400" />
                  {corpus.name}
                </CardTitle>
                <CardDescription className="text-slate-500 mt-2">
                  {corpus.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
