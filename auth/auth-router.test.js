const request = require('supertest');
const bcrypt = require('bcryptjs');

const server = require('../api/server');
const db = require('../data/db-config');

// Test passes!
xdescribe('POST /api/auth/register - For BOTH rider & driver user types', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should return 500 and proper message if missing username', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({});

    expect(response.status).toBe(500);

    expect(response.body).toEqual({ message: 'No username provided' });
  });

  it('should return 400 and proper message if missing role', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: 'Please provide valid user role',
    });
  });
});

// Test passes!
xdescribe('POST /api/auth/register - for rider user type', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should return 400 and proper message if missing information', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        role: 'rider',
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'Please provide registration information',
    });
  });

  it('should return 201 when registered', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        password: 'pass',
        role: 'rider',
        name: 'Test Name',
        location: 'Test Location',
      });

    expect(response.status).toBe(201);
  });

  it('should return json when registered', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        password: 'pass',
        role: 'rider',
        name: 'Test Name',
        location: 'Test Location',
      });

    expect(response.type).toMatch(/json/i);
  });

  it('should return a token when registered', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        password: 'pass',
        role: 'rider',
        name: 'Test Name',
        location: 'Test Location',
      });

    expect(response.body).toHaveProperty('token');
  });
});

// Test passes!
xdescribe('POST /api/auth/register - for driver user type', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should return 400 and proper message if missing information', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({
        username: 'TestUsername',
        role: 'driver',
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
      message: 'Please provide registration information',
    });
  });

  it('should return 201 when registered', async () => {
    const response = await request(server)
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

    expect(response.status).toBe(201);
  });

  it('should return json when registered', async () => {
    const response = await request(server)
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

    expect(response.type).toMatch(/json/i);
  });

  it('should return a token when registered', async () => {
    const response = await request(server)
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

    expect(response.body).toHaveProperty('token');
  });
});

// Test passes!
xdescribe('POST /api/auth/login', () => {
  beforeEach(async () => {
    await db('riders').truncate();
    await db('drivers').truncate();
    await db('reviews').truncate();
  });

  it('should return 500 and proper message if empty field submitted', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({});

    expect(response.status).toBe(500);

    expect(response.body).toEqual({
      message: 'Database error in finding user',
    });
  });

  it('should return 401 and proper message if improper login credentials', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'TestUser',
        password: 'pass',
      });

    expect(response.status).toBe(401);

    expect(response.body).toEqual({ message: 'Improper login credentials' });
  });

  it('should return 200, json, and a token when logged in as rider', async () => {
    await db('riders').insert(
      {
        username: 'TestUsername',
        password: bcrypt.hashSync('pass', 8),
        role_id: 3,
        name: 'Test Name',
        searching: 1,
      },
      'id',
    );

    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'TestUsername',
        password: 'pass',
      });

    console.log(response.error);

    expect(response.status).toBe(200);

    expect(response.type).toMatch(/json/i);

    expect(response.body).toHaveProperty('token');
  });

  it('should return 200, json, and a token when logged in as driver', async () => {
    await db('drivers').insert(
      {
        username: 'TestUsername',
        password: bcrypt.hashSync('pass', 8),
        role_id: 2,
        name: 'Test Name',
        location: 'Test Location',
        price: 150,
        bio: 'Test bio',
        available: 1,
      },
      'id',
    );

    const response = await request(server)
      .post('/api/auth/login')
      .send({
        username: 'TestUsername',
        password: 'pass',
      });

    console.log(response.error);

    expect(response.status).toBe(200);

    expect(response.type).toMatch(/json/i);

    expect(response.body).toHaveProperty('token');
  });
});

// Test passes!
xdescribe('GET /api/auth/users', () => {
  it('should return http 200 status code', async () => {
    const response = await request(server).get('/api/auth/users');

    expect(response.status).toBe(200);
  });

  it('should return json', async () => {
    const response = await request(server).get('/api/auth/users');

    expect(response.type).toMatch(/json/i);
  });
});
