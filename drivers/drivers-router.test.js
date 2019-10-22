const request = require('supertest');

const server = require('../api/server');
const db = require('../data/db-config');

// Test passes!
xdescribe('GET /api/drivers', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).get('/api/drivers');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 200 when authorized', async () => {
    const auth = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        password: 'pass',
        role: 'driver',
        name: 'Test Name',
        location: 'Test Location',
        price: 150,
        bio: 'Test Bio',
      });

    expect(auth.status).toBe(201);

    const response = await request(server)
      .get('/api/drivers')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/i);
  });
});

// Test passes!
xdescribe('GET /api/drivers/:id', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).get('/api/drivers/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 404 and proper message if error finding driver', async () => {
    const auth = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        password: 'pass',
        role: 'driver',
        name: 'Test Name',
        location: 'Test Location',
        price: 150,
        bio: 'Test Bio',
      });

    expect(auth.status).toBe(201);

    const response = await request(server)
      .get('/api/drivers/2')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Could not find driver with provided ID',
    });
  });

  it('should return 200', async () => {
    const auth = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        password: 'pass',
        role: 'driver',
        name: 'Test Name',
        location: 'Test Location',
        price: 150,
        bio: 'Test Bio',
      });

    expect(auth.status).toBe(201);

    const response = await request(server)
      .get('/api/drivers/1')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/i);
  });
});

// Needs to be tested
xdescribe('GET /api/drivers/:id/reviews', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).get('/api/drivers/1/reviews');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });
});

// Needs to be tested
xdescribe('PUT /api/drivers/:id', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).put('/api/drivers/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });
});

// Needs to be tested
xdescribe('DEL /api/drivers/:id', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).delete('/api/drivers/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });
});
