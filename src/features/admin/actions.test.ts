import { describe, it, expect, vi, beforeEach } from 'vitest';
import { importCSVAction } from './actions';
import { Inscription } from '../inscriptions/schema';
import * as auth from 'next-auth';

// Mock Mongoose model
vi.mock('../inscriptions/schema', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../inscriptions/schema')>();
  return {
    ...actual,
    Inscription: {
      bulkWrite: vi.fn().mockResolvedValue({ upsertedCount: 1, modifiedCount: 1 }),
      create: vi.fn().mockResolvedValue({ _id: 'mockid' }),
      findByIdAndUpdate: vi.fn().mockResolvedValue({ _id: 'mockid', tmId: 'TM123' }),
      findByIdAndDelete: vi.fn().mockResolvedValue({ _id: 'mockid' })
    }
  };
});

// Mock DB connection
vi.mock('@/lib/db', () => ({
  default: vi.fn()
}));

// Mock Auth
vi.mock('next-auth', () => ({
  getServerSession: vi.fn().mockResolvedValue({ user: { email: 'admin@admin.com' } })
}));

describe('importCSVAction', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fails if no file is provided', async () => {
    const formData = new FormData();
    const result = await importCSVAction(formData);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/No file uploaded/);
  });

  it('fails if user is not authenticated', async () => {
    vi.mocked(auth.getServerSession).mockResolvedValueOnce(null);
    const formData = new FormData();
    const result = await importCSVAction(formData);
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/Unauthorized/);
  });
  
  it('parses CSV and calls bulkWrite on success', async () => {
    const formData = new FormData();
    const csvContent = "Universal identifier,CIE\n12345,CIE 123";
    const file = new File([csvContent], 'test.csv', { type: 'text/csv' });
    formData.append('file', file);

    const result = await importCSVAction(formData);
    
    expect(Inscription.bulkWrite).toHaveBeenCalled();
    expect(result.success).toBe(true);
    expect(result.message).toMatch(/Successfully imported/);
  });
});
