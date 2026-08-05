import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import { Inscription } from '@/features/inscriptions/schema';
import InscriptionDetail from '@/features/inscriptions/components/InscriptionDetail';
import DisambiguationView from '@/features/inscriptions/components/DisambiguationView';

export default async function InscriptionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  await dbConnect();
  
  // Try finding by TM ID directly first
  let records = await Inscription.find({ tmId: decodedId }).lean();

  if (records.length === 0) {
    // If not found by TM ID, search by Corpus identifier (e.g. "CIE 131")
    records = await Inscription.find({ 'corpora.identifier': decodedId }).lean();
  }

  if (records.length === 0) {
    return notFound();
  }

  // Convert to plain JSON objects for client serialization
  const serializedRecords = JSON.parse(JSON.stringify(records));

  if (serializedRecords.length > 1) {
    return <DisambiguationView records={serializedRecords} query={decodedId} />;
  }

  return <InscriptionDetail record={serializedRecords[0]} />;
}
