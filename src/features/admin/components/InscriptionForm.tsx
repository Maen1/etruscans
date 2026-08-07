'use client';

import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { InscriptionSchema, type InscriptionData } from '../../inscriptions/schema';
import { createInscription, updateInscription } from '../actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Plus, Trash2 } from 'lucide-react';

interface InscriptionFormProps {
  initialData?: InscriptionData & { _id?: string };
}

export function InscriptionForm({ initialData }: InscriptionFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isEditing = !!initialData;

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(InscriptionSchema),
    defaultValues: initialData || {
      tmId: '',
      tmUrl: '',
      metadata: {
        objectType: '',
        language: '',
        isForgery: false,
      },
      corpora: [],
      references: [],
    }
  });

  const { fields: corporaFields, append: appendCorpora, remove: removeCorpora } = useFieldArray({
    control,
    name: 'corpora'
  });

  const { fields: refFields, append: appendRef, remove: removeRef } = useFieldArray({
    control,
    name: 'references'
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = isEditing && initialData._id
        ? await updateInscription(initialData._id, data)
        : await createInscription(data);
        
      if (result.success) {
        router.push('/admin');
      } else {
        setError(result.error || 'Something went wrong.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Inscription' : 'New Inscription'}</CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-8">
          {error && (
            <div className="bg-destructive/15 text-destructive p-3 rounded-md text-sm font-medium">
              {error}
            </div>
          )}
          
          {/* Base Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Base Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Trismegistos ID (tmId)</label>
                <Input {...register('tmId')} placeholder="e.g. 151991" />
                {errors.tmId && <p className="text-destructive text-xs">{errors.tmId.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Trismegistos URL</label>
                <Input {...register('tmUrl')} placeholder="https://www.trismegistos.org/text/151991" />
                {errors.tmUrl && <p className="text-destructive text-xs">{errors.tmUrl.message}</p>}
              </div>
            </div>
          </div>
          
          {/* Metadata */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Metadata</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Object Type</label>
                <Input {...register('metadata.objectType')} placeholder="e.g. Cippus" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Language</label>
                <Input {...register('metadata.language')} placeholder="e.g. Etruscan" />
              </div>
              <div className="space-y-2 flex flex-col justify-end pb-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" {...register('metadata.isForgery')} />
                  <span className="text-sm font-medium">Is Forgery?</span>
                </label>
              </div>
            </div>
          </div>

          {/* Corpora */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-medium">Corpora</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => appendCorpora({ name: '', identifier: '' })}>
                <Plus className="w-4 h-4 mr-2" /> Add Corpus
              </Button>
            </div>
            
            <div className="space-y-3">
              {corporaFields.map((field, index) => (
                <div key={field.id} className="flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <Input {...register(`corpora.${index}.name`)} placeholder="Corpus Name (e.g. CIE)" />
                    {errors.corpora?.[index]?.name && <p className="text-destructive text-xs">{errors.corpora[index]?.name?.message}</p>}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Input {...register(`corpora.${index}.identifier`)} placeholder="Identifier (e.g. 886)" />
                    {errors.corpora?.[index]?.identifier && <p className="text-destructive text-xs">{errors.corpora[index]?.identifier?.message}</p>}
                  </div>
                  <Button type="button" variant="ghost" size="icon" className="text-destructive" onClick={() => removeCorpora(index)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {corporaFields.length === 0 && <p className="text-sm text-muted-foreground italic">No corpora added.</p>}
            </div>
          </div>

          {/* References */}
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-medium">References</h3>
              <Button type="button" variant="outline" size="sm" onClick={() => appendRef({ category: 'Squeezes', label: '', uri: '' })}>
                <Plus className="w-4 h-4 mr-2" /> Add Reference
              </Button>
            </div>
            
            <div className="space-y-4">
              {refFields.map((field, index) => (
                <div key={field.id} className="p-4 border rounded-md relative bg-slate-50/50">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 text-destructive" 
                    onClick={() => removeRef(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pr-8">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500">Category</label>
                      <select 
                        {...register(`references.${index}.category`)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="Squeezes">Squeezes</option>
                        <option value="Rubbings">Rubbings</option>
                        <option value="Tracings">Tracings</option>
                        <option value="Plaster Casts">Plaster Casts</option>
                        <option value="Drawings/Paintings">Drawings/Paintings</option>
                        <option value="Photographs">Photographs</option>
                        <option value="Autopsy Notes">Autopsy Notes</option>
                        <option value="Notes (Non-Autopsy)">Notes (Non-Autopsy)</option>
                        <option value="Notes & Discussion">Notes & Discussion</option>
                        <option value="Manuscripts">Manuscripts</option>
                        <option value="Proofs">Proofs</option>
                        <option value="Mentions">Mentions</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500">Label (Link Text)</label>
                      <Input {...register(`references.${index}.label`)} placeholder="e.g. UUB 591" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-slate-500">URI</label>
                      <Input {...register(`references.${index}.uri`)} placeholder="https://..." />
                      {errors.references?.[index]?.uri && <p className="text-destructive text-xs">{errors.references[index]?.uri?.message}</p>}
                    </div>
                  </div>
                </div>
              ))}
              {refFields.length === 0 && <p className="text-sm text-muted-foreground italic">No references added.</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6">
          <Button type="button" variant="outline" onClick={() => router.push('/admin')} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Inscription'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
