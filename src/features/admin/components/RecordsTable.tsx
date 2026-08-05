import { InscriptionData } from '../../inscriptions/schema';
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
