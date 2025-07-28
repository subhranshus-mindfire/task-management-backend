import mongoose from 'mongoose';
import request from 'supertest';
import app from '../../src/app';

beforeAll(async () => {
  await mongoose.connect('mongodb+srv://subhranshumfs:White1947@cluster0.jebf9ua.mongodb.net/TaskManagementTest?retryWrites=true&w=majority&appName=Cluster0');
});

afterAll(async () => {
  await mongoose.connection.db?.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Controller', () => {
  it('POST /api/auth/register should register and login user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      name: 'Test User',
      email: 'test2@example.com',
      password: 'Password123',
      role: 'manager'
    });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('User registered & logged in.');
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('POST /api/auth/login should login user', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'test2@example.com',
      password: 'Password123'
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Login successful.');
    expect(res.headers['set-cookie']).toBeDefined();
  });
});
