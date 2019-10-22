const request = require('supertest');

const server = require('../api/server');
const db = require('../data/db-config');

// Test passes!
describe('GET /api/riders', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).get('/api/riders');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 200 when authorized', async () => {
    const auth = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        password: 'pass',
        role: 'rider',
        name: 'Test Name',
        location: 'Test Location',
      });

    expect(auth.status).toBe(201);

    const response = await request(server)
      .get('/api/riders')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/i);
  });
});

// Needs to be tested
xdescribe('GET /api/riders/:id', () => {});

// Needs to be tested
xdescribe('GET /api/riders/:id/reviews', () => {});

// Needs to be tested
xdescribe('PUT /api/riders/:id', () => {});

// Needs to be tested
xdescribe('DEL /api/riders/:id', () => {});
