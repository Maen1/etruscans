'use server';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import { Inscription, InscriptionSchema } from '../inscriptions/schema';
import { parseInscriptionsCsv } from './import';
import { revalidatePath } from 'next/cache';

export async function importCSVAction(formData: FormData): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' };
    }

    const file = formData.get('file') as File | null;
    if (!file) {
      return { success: false, error: 'No file uploaded' };
    }

    const csvText = await file.text();
    const records = await parseInscriptionsCsv(csvText);

    if (records.length === 0) {
      return { success: false, error: 'No valid records found in CSV' };
    }

    await dbConnect();
    
    const bulkOps = records.map((record) => {
      const validatedData = InscriptionSchema.parse(record);
      return {
        updateOne: {
          filter: { tmId: validatedData.tmId },
          update: { $set: validatedData },
          upsert: true
        }
      };
    });

    const result = await Inscription.bulkWrite(bulkOps);

    return { 
      success: true, 
      message: `Successfully imported CSV. Upserted ${result.upsertedCount}, Modified ${result.modifiedCount}.`
    };
  } catch (error: any) {
    console.error('Import error:', error);
    return { success: false, error: error.message || 'Failed to import CSV' };
  }
}

export async function createInscription(data: any): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' };
    }
    
    await dbConnect();
    const validatedData = InscriptionSchema.parse(data);
    await Inscription.create(validatedData);
    
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Create error:', error);
    return { success: false, error: error.message || 'Failed to create inscription' };
  }
}

export async function updateInscription(id: string, data: any): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' };
    }
    
    await dbConnect();
    const validatedData = InscriptionSchema.parse(data);
    const result = await Inscription.findByIdAndUpdate(id, validatedData, { new: true });
    
    if (!result) {
      return { success: false, error: 'Inscription not found' };
    }
    
    revalidatePath('/admin');
    revalidatePath(`/text/${result.tmId}`);
    return { success: true };
  } catch (error: any) {
    console.error('Update error:', error);
    return { success: false, error: error.message || 'Failed to update inscription' };
  }
}

export async function deleteInscription(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return { success: false, error: 'Unauthorized' };
    }
    
    await dbConnect();
    await Inscription.findByIdAndDelete(id);
    
    revalidatePath('/admin');
    revalidatePath('/');
    return { success: true };
  } catch (error: any) {
    console.error('Delete error:', error);
    return { success: false, error: error.message || 'Failed to delete inscription' };
  }
}
