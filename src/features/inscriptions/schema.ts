import mongoose from 'mongoose';
export * from './validations';

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
