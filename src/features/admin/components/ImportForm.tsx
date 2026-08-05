'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { importCSVAction } from '../actions';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { UploadCloud, Loader2 } from 'lucide-react';

export default function ImportForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    setMessage(null);
    
    try {
      const result = await importCSVAction(formData);
      if (result.success) {
        setMessage({ type: 'success', text: result.message || 'Import successful.' });
        router.refresh();
      } else {
        setMessage({ type: 'error', text: result.error || 'Import failed.' });
      }
    } catch (e: any) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <Card className="w-full max-w-lg mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-indigo-600" />
          Batch CSV Import
        </CardTitle>
      </CardHeader>
      <form action={handleSubmit}>
        <CardContent className="space-y-4">
          <p className="text-sm text-slate-500">
            Upload the master spreadsheet containing epigraphic and reference mappings. This will upsert records based on their Trismegistos ID.
          </p>
          <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition-colors">
            <input 
              type="file" 
              name="file" 
              accept=".csv"
              required
              className="text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          
          {message && (
            <div className={`p-3 rounded-md text-sm font-medium ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message.text}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isPending} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              'Upload and Import'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
