import fs from 'fs';
import path from 'path';
import dbConnect from './src/lib/db';
import { Inscription } from './src/features/inscriptions/schema';
import { parseInscriptionsCsv } from './src/features/admin/import';
import mongoose from 'mongoose';

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    // We are running this outside Next.js, so load env vars from .env.local manually
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envVars = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of envVars) {
      if (line.startsWith('MONGODB_URI=')) {
        process.env.MONGODB_URI = line.split('=')[1];
      }
    }
    
    await dbConnect();
    console.log('Connected.');

    const csvPath = path.resolve(process.cwd(), 'Sheet 1_Table 1.csv');
    if (!fs.existsSync(csvPath)) {
      console.error(`CSV file not found at ${csvPath}`);
      process.exit(1);
    }

    const csvContent = fs.readFileSync(csvPath, 'utf8');
    console.log('Parsing CSV...');
    const parsedData = await parseInscriptionsCsv(csvContent);
    
    console.log(`Parsed ${parsedData.length} records. Upserting to database...`);
    
    const bulkOps = parsedData.map(item => ({
      updateOne: {
        filter: { tmId: item.tmId },
        update: { $set: item },
        upsert: true
      }
    }));

    if (bulkOps.length > 0) {
      const result = await Inscription.bulkWrite(bulkOps);
      console.log(`Success! Upserted ${result.upsertedCount}, Modified ${result.modifiedCount}.`);
    } else {
      console.log('No valid records found to insert.');
    }

  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
