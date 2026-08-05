import Link from 'next/link';
import { InscriptionData } from '../schema';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DisambiguationView({ records, query }: { records: InscriptionData[], query: string }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Disambiguation</CardTitle>
          <p className="text-slate-500">
            Multiple records found for "{query}". Please select the specific inscription:
          </p>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {records.map((record) => (
              <li key={record.tmId} className="border p-4 rounded-md hover:bg-slate-50 transition-colors">
                <Link href={`/text/${record.tmId}`} className="block text-lg font-semibold text-indigo-600 hover:underline">
                  {record.tmId}
                </Link>
                <div className="text-sm text-slate-600 mt-1">
                  Type: {record.metadata.objectType || 'Unknown'} | Language: {record.metadata.language || 'Unknown'}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
