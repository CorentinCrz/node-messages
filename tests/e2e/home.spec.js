const supertest = require('supertest');
const request = supertest('http://localhost:3000');

describe('GET /', () => {
  it('should get home status', () => {
    return request.get('/')
      .expect(200)
      .expect(({ body }) => {
        expect(body.page).toBe('home');
        expect(body.status).toBe('on');
      })
  });
});
