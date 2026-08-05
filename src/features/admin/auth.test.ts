import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { authorizeAdmin } from './auth';

describe('authorizeAdmin', () => {
  beforeEach(() => {
    process.env.ADMIN_USERNAME = 'admin_test';
    process.env.ADMIN_PASSWORD = 'password_test';
  });

  afterEach(() => {
    delete process.env.ADMIN_USERNAME;
    delete process.env.ADMIN_PASSWORD;
  });

  it('should return admin user object for valid credentials', async () => {
    const user = await authorizeAdmin('admin_test', 'password_test');
    expect(user).toEqual({ id: 'admin', name: 'PI Admin' });
  });

  it('should return null for invalid password', async () => {
    const user = await authorizeAdmin('admin_test', 'wrong');
    expect(user).toBeNull();
  });

  it('should return null for invalid username', async () => {
    const user = await authorizeAdmin('wrong', 'password_test');
    expect(user).toBeNull();
  });

  it('should throw an error if environment variables are missing', async () => {
    delete process.env.ADMIN_USERNAME;
    await expect(authorizeAdmin('admin', 'pass')).rejects.toThrow('Admin credentials not configured in environment');
  });
});
