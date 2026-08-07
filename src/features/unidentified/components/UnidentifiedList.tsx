import Link from 'next/link';
import { Inscription } from '@/features/inscriptions/schema';
import dbConnect from '@/lib/db';

export async function UnidentifiedList() {
  await dbConnect();
  
  // Find inscriptions that are marked as unidentified (e.g. empty corpora array)
  // or have a specific "Unidentified" corpus.
  const unidentifiedRecords = await Inscription.find({
    $or: [
      { corpora: { $size: 0 } },
      { 'corpora.name': 'Unidentified' }
    ]
  }).lean();

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">Unidentified Inscriptions</h1>
      
      <div className="prose dark:prose-invert mb-8">
        <p>
          The following entries refer to inscriptions or fragments that have not yet been securely identified and linked to a standard epigraphic corpus. 
        </p>
        <p className="bg-muted p-4 rounded-md border">
          <strong>Can you help?</strong> If you recognize any of these materials or have suggestions for their identification, please get in touch with us at <a href="mailto:annie.burman@lingfil.uu.se" className="text-primary font-medium hover:underline">annie.burman@lingfil.uu.se</a>.
        </p>
      </div>

      {unidentifiedRecords.length === 0 ? (
        <p className="text-muted-foreground italic">No unidentified inscriptions found at this time.</p>
      ) : (
        <div className="space-y-4">
          {unidentifiedRecords.map((record: any) => (
            <div key={record._id.toString()} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">
                  <Link href={`/text/${record.tmId}`} className="hover:underline text-primary">
                    TM {record.tmId}
                  </Link>
                </h2>
                {record.metadata?.objectType && (
                  <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                    {record.metadata.objectType}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {record.metadata?.language && `Language: ${record.metadata.language}`}
                {record.metadata?.isForgery && <span className="ml-2 text-destructive font-medium">(Forgery)</span>}
              </p>
              
              {record.references && record.references.length > 0 && (
                <div className="text-sm">
                  <span className="font-medium">Archive References: </span>
                  <span className="text-muted-foreground">
                    {record.references.map((ref: any) => ref.label).join('; ')}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
