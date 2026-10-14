import { z } from 'zod';

export const ReferenceSchema = z.object({
  category: z.string(),
  label: z.string(),
  uri: z.union([z.string().url(), z.literal('')]).optional()
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
