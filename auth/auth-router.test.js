const request = require('supertest');

const server = require('../api/server');

// Needs to be tested
describe('POST /api/auth/register', () => {});

// Needs to be tested
describe('POST /api/auth/login', () => {});

// Test passes!
describe('GET /api/auth/users', () => {
  it('should return http 200 status code', async () => {
    const response = await request(server).get('/api/auth/users');

    expect(response.status).toBe(200);
  });

  it('should return json', async () => {
    const response = await request(server).get('/api/auth/users');

    expect(response.type).toMatch(/json/i);
  });
});
