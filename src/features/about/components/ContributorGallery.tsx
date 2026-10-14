import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

export interface Contributor {
  name: string;
  role: string;
  affiliation?: string;
  bio: string;
  imageSrc?: string;
}

const DEFAULT_CONTRIBUTORS: Contributor[] = [
  {
    name: 'Olof August Danielsson',
    role: 'Epigraphist & Collector (1852–1933)',
    affiliation: 'Uppsala University',
    bio: 'Professor of Greek Language and Literature at Uppsala University. Danielsson dedicated decades to copying, transcribing, and editing Etruscan inscriptions across Italy for the Corpus Inscriptionum Etruscarum (CIE).',
  },
  {
    name: 'Archive Research Team',
    role: 'Digitisation & Editorial Contributors',
    affiliation: 'CDHU / Uppsala University Library',
    bio: 'Researchers, archivists, and digital humanists coordinating the cataloguing of Danielsson’s papers, squeezes, tracings, and linking them to modern epigraphic databases and the Alvin platform.',
  }
];

export function ContributorGallery({
  contributors = DEFAULT_CONTRIBUTORS,
}: {
  contributors?: Contributor[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      {contributors.map((contributor) => (
        <Card key={contributor.name} className="border-border/70 overflow-hidden card-hover">
          <CardContent className="p-6 flex flex-col sm:flex-row gap-4 items-start">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden bg-muted flex items-center justify-center shrink-0 border-2 border-border shadow-inner">
              {contributor.imageSrc ? (
                <Image
                  src={contributor.imageSrc}
                  alt={contributor.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-muted-foreground/60" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold font-heading text-foreground">
                {contributor.name}
              </h3>
              <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                {contributor.role}
              </p>
              {contributor.affiliation && (
                <p className="text-xs text-muted-foreground mb-2">
                  {contributor.affiliation}
                </p>
              )}
              <p className="text-sm text-foreground/80 leading-relaxed">
                {contributor.bio}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
