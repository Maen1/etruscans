import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ImportForm from '@/features/admin/components/ImportForm';

export default function AdminImportPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Link href="/admin" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-4 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Import Records</h1>
        <p className="text-sm text-slate-500">Update the database with the latest spreadsheet.</p>
      </div>

      <ImportForm />
    </div>
  );
}
