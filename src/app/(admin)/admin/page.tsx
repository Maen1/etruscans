import Link from "next/link";
import { PlusCircle } from "lucide-react";

import dbConnect from '@/lib/db';
import { Inscription } from '@/features/inscriptions/schema';
import RecordsTable from '@/features/admin/components/RecordsTable';

export default async function AdminDashboardPage() {
  await dbConnect();
  
  // Fetch all inscriptions (using lean for RSC performance)
  // Converting to JSON to serialize Mongoose ObjectId correctly for Client/RSC boundaries
  const records = await Inscription.find({}).lean();
  const serializedRecords = JSON.parse(JSON.stringify(records));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Inscriptions Database</h1>
          <p className="text-sm text-slate-500">Manage all records, corpus references, and Alvin digital repository links.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/import"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 h-9 px-4 py-2"
          >
            Import CSV
          </Link>
          <Link
            href="/admin/new"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-indigo-600 text-white hover:bg-indigo-700 h-9 px-4 py-2"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Record
          </Link>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-md">
        <RecordsTable records={serializedRecords} />
      </div>
    </div>
  );
}
