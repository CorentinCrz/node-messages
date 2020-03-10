const supertest = require('supertest');
const request = supertest('http://localhost:3000');

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms);
  })
}

describe('GET /messages', () => {
  it('should get messages properly', async () => {
    return request.get('/messages')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(5);
      })
  });
});

describe('POST /messages', () => {
  const newMessage = 'Hello new test message'
  it('should create a message', async () => {
    return request.post('/messages')
      .send({ title: newMessage, content: 'content' })
      .expect(200)
      .expect(({ body }) => {
        console.log(body);
        expect(body.message.title).toBe(newMessage);
      })
  });

  it('should retrieve new message in GET /messages', async () => {
    await sleep(2000);
    return request.get('/messages')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(6);
        
        if (!body.find(msg => msg.content === newMessage)) {
          throw new Error('message has not been created');
        }
      });
  });
})