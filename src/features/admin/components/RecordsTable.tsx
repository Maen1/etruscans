'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { InscriptionData } from '../../inscriptions/schema';
import { deleteInscription } from '../actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface RecordsTableProps {
  records: InscriptionData[];
}

export default function RecordsTable({ records }: RecordsTableProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inscription?')) return;
    setIsDeleting(id);
    try {
      await deleteInscription(id);
      router.refresh();
    } catch (err) {
      console.error(err);
      alert('Failed to delete');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Trismegistos ID</TableHead>
            <TableHead>Object Type</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Corpora</TableHead>
            <TableHead className="text-right">References Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.tmId}>
                <TableCell className="font-medium">{record.tmId}</TableCell>
                <TableCell>{record.metadata.objectType || '-'}</TableCell>
                <TableCell>{record.metadata.language || '-'}</TableCell>
                <TableCell>
                  {record.corpora.map(c => `${c.name} ${c.identifier}`).join(', ') || '-'}
                </TableCell>
                <TableCell className="text-right">
                  {record.references.length} refs
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/edit/${(record as any)._id}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border text-slate-500 hover:bg-slate-100"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete((record as any)._id)}
                      disabled={isDeleting === (record as any)._id}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md border text-red-500 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
