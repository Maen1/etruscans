import { notFound } from 'next/navigation';
import { InscriptionForm } from '@/features/admin/components/InscriptionForm';
import { Inscription } from '@/features/inscriptions/schema';
import dbConnect from '@/lib/db';

export const metadata = {
  title: 'Edit Inscription - PI Dashboard',
};

export default async function EditInscriptionPage({ params }: { params: { id: string } }) {
  await dbConnect();
  
  const record = await Inscription.findById(params.id).lean();
  
  if (!record) {
    notFound();
  }

  // Convert MongoDB ObjectId to string so it can be passed to the Client Component
  const serializedRecord = {
    ...record,
    _id: record._id.toString(),
  };

  return (
    <div className="py-6">
      <InscriptionForm initialData={serializedRecord as any} />
    </div>
  );
}
