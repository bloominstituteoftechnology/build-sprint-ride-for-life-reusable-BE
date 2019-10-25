const request = require('supertest');

const server = require('../api/server');
const db = require('../data/db-config');

// Test passes!
xdescribe('GET /api/riders', () => {
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

// Test passes!
xdescribe('GET /api/riders/:id', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).get('/api/riders/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 404 and proper message if error finding rider', async () => {
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
      .get('/api/riders/2')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Could not find rider with provided ID',
    });
  });

  it('should return 200', async () => {
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
      .get('/api/riders/1')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/i);
  });
});

// Needs to be tested
xdescribe('GET /api/riders/:id/reviews', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).get('/api/riders/1/reviews');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return http 200 status code when authorized', async () => {
    const driver = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestDriverName',
        password: 'pass',
        role: 'driver',
        name: 'Test Name',
        location: 'Test Location',
        price: 150,
        bio: 'Test Bio',
      });

    expect(driver.status).toBe(201);

    const rider = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestRiderName',
        password: 'pass',
        role: 'rider',
        name: 'Test Name',
        location: 'Test Location',
      });

    expect(rider.status).toBe(201);

    await db('reviews').insert(
      {
        stars: 5,
        date: '10/22/2019',
        driver_id: 1,
        rider_id: 1,
        anonymous: true,
      },
      'id',
    );

    const response = await request(server)
      .get('/api/riders/1/reviews')
      .set('authorization', driver.body.token);

    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/i);
  });
});

// Test passes!
xdescribe('PUT /api/riders/:id', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).put('/api/riders/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 400 and proper message if missing rider information', async () => {
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
      .put('/api/riders/1')
      .set('authorization', auth.body.token)
      .send({ password: 'pass' });

    console.log(response.body);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Please provide rider information to update',
    });
  });

  it('should return 500 and proper message if rider not found', async () => {
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
      .put('/api/riders/2')
      .set('authorization', auth.body.token)
      .send({ password: 'pass', location: 'Updated Location' });

    console.log(response.body);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Error finding rider',
    });
  });

  it('should return 200 and json if rider updated', async () => {
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
      .put('/api/riders/1')
      .set('authorization', auth.body.token)
      .send({ password: 'pass', location: 'Updated Location' });

    console.log(response.body);

    expect(response.status).toBe(200);
  });
});

// Test passes!
xdescribe('DEL /api/riders/:id', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).delete('/api/riders/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 404 and proper message if rider not found', async () => {
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
      .del('/api/riders/2')
      .set('authorization', auth.body.token);

    console.log(response.body);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Invalid rider ID',
    });
  });

  it('should return 200 and json if rider deleted', async () => {
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
      .del('/api/riders/1')
      .set('authorization', auth.body.token);

    console.log(response.body);

    expect(response.status).toBe(200);
  });
});
