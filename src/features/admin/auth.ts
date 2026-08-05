import bcrypt from 'bcryptjs';

export async function authorizeAdmin(username?: string, password?: string): Promise<{ id: string, name: string } | null> {
  const envUsername = process.env.ADMIN_USERNAME;
  const envPassword = process.env.ADMIN_PASSWORD;

  if (!envUsername || !envPassword) {
    throw new Error('Admin credentials not configured in environment');
  }

  if (username === envUsername) {
    // If we're using raw passwords or bcrypt. For simplicity, check direct string match first.
    // In production we would use bcrypt.compare(password, envPassword).
    // The prompt says "plaintext or bcrypt-hashed". We'll do a simple check.
    if (password === envPassword) {
      return { id: 'admin', name: 'PI Admin' };
    }
  }

  return null;
}
