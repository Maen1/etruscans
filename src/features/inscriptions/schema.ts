import mongoose from 'mongoose';
import { z } from 'zod';

export const ReferenceSchema = z.object({
  category: z.string(),
  label: z.string(),
  uri: z.string().url()
});

export const InscriptionSchema = z.object({
  tmId: z.string(),
  tmUrl: z.string().url().optional(),
  metadata: z.object({
    objectType: z.string().optional(),
    language: z.string().optional(),
    isForgery: z.boolean().default(false)
  }),
  corpora: z.array(z.object({
    name: z.string(),
    identifier: z.string()
  })),
  references: z.array(ReferenceSchema)
});

export type InscriptionData = z.infer<typeof InscriptionSchema>;

const inscriptionDbSchema = new mongoose.Schema({
  tmId: { type: String, required: true, unique: true },
  tmUrl: String,
  metadata: {
    objectType: String,
    language: String,
    isForgery: { type: Boolean, default: false }
  },
  corpora: [{
    name: String,
    identifier: String
  }],
  references: [{
    category: String,
    label: String,
    uri: String
  }]
});

// Enforce multi-key indexes for fast query/search per AGENTS.md rules
inscriptionDbSchema.index({ 'corpora.name': 1, 'corpora.identifier': 1 });
inscriptionDbSchema.index({ 'references.label': 'text' });

export const Inscription = mongoose.models.Inscription || mongoose.model('Inscription', inscriptionDbSchema);
