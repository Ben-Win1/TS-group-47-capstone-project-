const request = require('supertest');
const app = require('../src/app');

describe('Core Infrastructure & Health Endpoint', () => {
  it('GET /health - should return 200 OK with server status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body).toHaveProperty('status', 'UP');
  });

  it('GET /api/v1/non-existent-route - should return 404 for unknown endpoints', async () => {
    const res = await request(app).get('/api/v1/non-existent-route');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('success', false);
  });
});