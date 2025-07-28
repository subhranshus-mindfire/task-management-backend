import mongoose from 'mongoose';
import { registerUser, loginUser } from '../../src/services/auth.service';
import { User } from '../../src/models/User';

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://subhranshumfs:White1947@cluster0.jebf9ua.mongodb.net/TaskManagementTest?retryWrites=true&w=majority&appName=Cluster0');
});

afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Service', () => {
  it('should register a new user', async () => {
    const result = await registerUser(
      'Test User',
      'test@example.com',
      'Password123',
      'employee'
    );
    expect(result.user.email).toBe('test@example.com');
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });

  it('should login an existing user', async () => {
    const result = await loginUser('test@example.com', 'Password123');
    expect(result.user.email).toBe('test@example.com');
    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
  });

  it('should throw error for wrong password', async () => {
    await expect(loginUser('test@example.com', 'WrongPass')).rejects.toThrow('Invalid credentials.');
  });
});
