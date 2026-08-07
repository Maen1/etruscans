import { InscriptionForm } from '@/features/admin/components/InscriptionForm';

export const metadata = {
  title: 'New Inscription - PI Dashboard',
};

export default function NewInscriptionPage() {
  return (
    <div className="py-6">
      <InscriptionForm />
    </div>
  );
}
