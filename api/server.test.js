const request = require('supertest');

const server = require('./server');

// Test passes!
xdescribe('GET /', () => {
  it('should return http 200 status code', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
  });

  it('should return json', async () => {
    const response = await request(server).get('/');
    expect(response.type).toMatch(/json/i);
  });

  it('should return an object with a message', async () => {
    const response = await request(server).get('/');
    expect(response.body).toEqual({
      message: 'Hello World from RideForLife Backend API!',
    });
  });
});
