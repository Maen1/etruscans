import { InscriptionData } from '../schema';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function InscriptionDetail({ record }: { record: InscriptionData }) {
  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold flex items-center justify-between">
            {record.tmId}
            {record.metadata.isForgery && (
              <span className="text-sm font-semibold text-red-600 bg-red-100 px-3 py-1 rounded-full">
                ⚠️ Possible Forgery
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-gray-500">Object Type</h3>
              <p className="text-lg">{record.metadata.objectType || 'Unknown'}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-500">Language</h3>
              <p className="text-lg">{record.metadata.language || 'Unknown'}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-500 mb-2">Corpora Editions</h3>
            <ul className="flex flex-wrap gap-2">
              {record.corpora.map((corpus, i) => (
                <li key={i} className="bg-slate-100 border border-slate-200 px-3 py-1 rounded-md text-sm font-medium text-slate-800">
                  {corpus.identifier}
                </li>
              ))}
            </ul>
          </div>

          {record.references && record.references.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-500 mb-2">Archive References (Alvin)</h3>
              <ul className="space-y-2">
                {record.references.map((ref, i) => (
                  <li key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b pb-2 last:border-0">
                    <span className="font-medium min-w-[120px] text-slate-600">{ref.category}</span>
                    <a 
                      href={ref.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 hover:underline break-all"
                    >
                      {ref.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
