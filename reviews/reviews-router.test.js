const request = require('supertest');

const server = require('../api/server');
const db = require('../data/db-config');

// Test passes!
xdescribe('GET /api/reviews', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).get('/api/reviews');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return http 200 status code when authorized', async () => {
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
      .get('/api/reviews')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/i);
  });
});

// Test passes!
xdescribe('POST /api/reviews', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).post('/api/reviews');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 400 and proper message if missing review information', async () => {
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
      .post('/api/reviews')
      .set('authorization', auth.body.token)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Please provide review information',
    });
  });

  it('should return 201 and json if review posted', async () => {
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
      .post('/api/reviews')
      .set('authorization', auth.body.token)
      .send({
        stars: 5,
        date: '10/22/2019',
        driver_id: 1,
        rider_id: 1,
        anonymous: true,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('review');
  });
});

// Test passes!
xdescribe('PUT /api/review/:id', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).put('/api/reviews/1');
    expect(response.status).toBe(401);

    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 400 and proper message if missing review information', async () => {
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

    const post = await request(server)
      .post('/api/reviews')
      .set('authorization', auth.body.token)
      .send({
        stars: 5,
        date: '10/22/2019',
        driver_id: 1,
        rider_id: 1,
        anonymous: true,
      });

    expect(post.status).toBe(201);

    const response = await request(server)
      .put('/api/reviews/1')
      .set('authorization', auth.body.token)
      .send({});

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Please provide review information to update',
    });
  });

  it('should return 404 and proper message if review not found', async () => {
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

    const post = await request(server)
      .post('/api/reviews')
      .set('authorization', auth.body.token)
      .send({
        stars: 5,
        date: '10/22/2019',
        driver_id: 1,
        rider_id: 1,
        anonymous: true,
      });

    expect(post.status).toBe(201);

    const response = await request(server)
      .put('/api/reviews/2')
      .set('authorization', auth.body.token)
      .send({ stars: 4 });

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Could not find review with provided ID',
    });
  });

  it('should return 200 and json if review updated', async () => {
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

    const post = await request(server)
      .post('/api/reviews')
      .set('authorization', auth.body.token)
      .send({
        stars: 5,
        date: '10/22/2019',
        driver_id: 1,
        rider_id: 1,
        anonymous: true,
      });

    expect(post.status).toBe(201);

    const response = await request(server)
      .put('/api/reviews/1')
      .set('authorization', auth.body.token)
      .send({ stars: 4 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('stars');
    expect(response.body).toHaveProperty('date');
    expect(response.body).toHaveProperty('comment');
    expect(response.body).toHaveProperty('driver_id');
    expect(response.body).toHaveProperty('rider_id');
    expect(response.body).toHaveProperty('anonymous');
  });
});

// Test passes!
xdescribe('DEL /api/review/:id', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should require authorization', async () => {
    const response = await request(server).delete('/api/reviews/1');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Token not found' });
  });

  it('should return 404 if invalid review id', async () => {
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

    const post = await request(server)
      .post('/api/reviews')
      .set('authorization', auth.body.token)
      .send({
        stars: 5,
        date: '10/22/2019',
        driver_id: 1,
        rider_id: 1,
        anonymous: true,
      });

    expect(post.status).toBe(201);

    const response = await request(server)
      .delete('/api/reviews/2')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: 'Invalid review ID',
    });
  });

  it('should return 200 if review deleted', async () => {
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

    const post = await request(server)
      .post('/api/reviews')
      .set('authorization', auth.body.token)
      .send({
        stars: 5,
        date: '10/22/2019',
        driver_id: 1,
        rider_id: 1,
        anonymous: true,
      });

    expect(post.status).toBe(201);

    const response = await request(server)
      .delete('/api/reviews/1')
      .set('authorization', auth.body.token);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'The review has been deleted' });
  });
});
