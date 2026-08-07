import Link from 'next/link';

export function AboutProject() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">About the Project</h1>
      <div className="prose dark:prose-invert">
        <p>
          "Etruscans in the Archive" is a searchable and browsable public database of digitised epigraphic collections of Olof August Danielsson.
        </p>
        <p>
          The purpose of this database is to make these materials available. The material is hosted on Alvin, but this portal allows for extensive searching and browsing of field notes, images, and other epigraphic facsimiles.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">What this database is (and isn't)</h2>
        <p className="font-medium text-destructive">
          <strong>Important:</strong> This is a database, not a corpus.
        </p>
        <p>
          It serves as a finding-aid and access point for archive materials, linking them to their respective epigraphic metadata. It is not intended to act as an authoritative epigraphic edition.
        </p>
        
        <h2 className="text-2xl font-semibold mt-8 mb-4">The Material</h2>
        <p>The material includes:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Epigraphic facsimiles (squeezes, tracings, rubbings) - life-sized copies of inscriptions</li>
          <li>Drawings/illustrations</li>
          <li>Photographs</li>
          <li>Field-notes</li>
          <li>Notes not done in the field</li>
          <li>Manuscripts</li>
          <li>Proofs</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Learn More</h2>
        <p>
          You can read more about the specific <Link href="/about/corpora" className="text-primary underline hover:text-primary/80">corpora referenced in this database</Link>.
        </p>
      </div>
    </div>
  );
}
