import Link from 'next/link';
import { ContributorGallery } from './ContributorGallery';

export function AboutProject() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="border-b border-border pb-6 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight font-heading mb-3">
          About the Project & the Archive
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          The digitised epigraphic collections of Olof August Danielsson, bridging historical facsimile materials with modern digital research infrastructure.
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">
            The Project
          </h2>
          <p className="text-base text-foreground/90 leading-relaxed">
            &quot;Etruscans in the Archive&quot; is a searchable and browsable public database providing structured access to the extensive epigraphic collection of Olof August Danielsson (1852–1933). Developed in collaboration between the Centre for Digital Humanities Uppsala (CDHU) and the Department of Archaeology and Ancient History, the platform bridges archival facsimile records hosted on the Alvin digital repository with canonical epigraphic corpora.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">
            The Archive
          </h2>
          <p className="text-base text-foreground/90 leading-relaxed mb-4">
            Preserved at Uppsala University Library (Carolina Rediviva), the collection encompasses thousands of physical impressions, drawings, and notebooks produced during Danielsson&apos;s extensive research travels throughout Italy between the 1880s and early 1900s:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 not-prose">
            <div className="bg-muted/40 p-4 rounded-lg border border-border/60">
              <h4 className="font-semibold text-foreground text-sm mb-1">Epigraphic Facsimiles</h4>
              <p className="text-xs text-muted-foreground">Paper squeezes (calchi), rubbings, and tracings capturing true 1:1 tactile impressions of stone and terracotta inscriptions.</p>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg border border-border/60">
              <h4 className="font-semibold text-foreground text-sm mb-1">Field Notebooks & Autopsies</h4>
              <p className="text-xs text-muted-foreground">Detailed autopsy notes recording readings, measurements, discovery locations, and sketches directly in Italian museums and archaeological sites.</p>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg border border-border/60">
              <h4 className="font-semibold text-foreground text-sm mb-1">Photographs & Casts</h4>
              <p className="text-xs text-muted-foreground">Historical photographic prints and plaster casts recording inscription conditions and archaeological contexts.</p>
            </div>
            <div className="bg-muted/40 p-4 rounded-lg border border-border/60">
              <h4 className="font-semibold text-foreground text-sm mb-1">Editorial Manuscripts & Proofs</h4>
              <p className="text-xs text-muted-foreground">Draft chapters, commentary, and proof sheets prepared for the Corpus Inscriptionum Etruscarum (CIE).</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold font-heading mb-4 text-foreground">
            Contributors & Key Figures
          </h2>
          <p className="text-base text-foreground/90 leading-relaxed mb-2">
            The archive reflects the lifelong scholarly endeavors of Danielsson and the ongoing work of researchers cataloguing his legacy.
          </p>
          <div className="not-prose">
            <ContributorGallery />
          </div>
        </section>

        <section className="bg-muted/30 p-6 rounded-xl border border-border">
          <h2 className="text-xl font-bold font-heading mb-2 text-foreground">
            What this database is (and isn&apos;t)
          </h2>
          <p className="font-medium text-destructive mb-2 text-sm">
            Important: This is an archival database and finding-aid, not an authoritative epigraphic corpus.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The database facilitates discoverability by linking physical archival facsimiles in Alvin to Trismegistos and major published corpora. For authoritative readings, scholars should consult the respective published editions (CIE, Etruskische Texte, etc.).
          </p>
        </section>

        <section className="pt-4 border-t border-border">
          <h3 className="text-lg font-bold font-heading mb-2 text-foreground">
            Corpus Reference Documentation
          </h3>
          <p className="text-sm text-muted-foreground">
            Detailed descriptions of the epigraphic corpora and publication abbreviations used across this portal are available in our{' '}
            <Link href="/about/corpora" className="text-primary underline font-medium hover:text-primary/80">
              Corpora Documentation Guide &rarr;
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
