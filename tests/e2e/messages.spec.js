import "regenerator-runtime/runtime";
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
        expect(body.length).toBe(3);
      })
  });
});

const newMessage = 'Hello new test message';
let messageId = 1;
describe('POST /messages', () => {
  it('should create a message', async () => {
    return request.post('/messages')
      .send({ title: newMessage, content: 'content' })
      .expect(201)
      .expect(({ body }) => {
        messageId = body.id;
        expect(body.title).toBe(newMessage);
      })
  });

  it('should retrieve new message in GET /messages', async () => {
    await sleep(2000);
    return request.get('/messages')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(4);
        
        if (!body.find(msg => msg.title === newMessage)) {
          throw new Error('message has not been created');
        }
      });
  });
})

describe('UPDATE /messages/:id', () => {
  it('should get messages properly', async () => {
    await sleep(2000);
    return request.put(`/messages/${messageId}`)
      .send({ content: newMessage })
      .expect(200);
  });

  it('should retrieve new message in GET /messages', async () => {
    await sleep(2000);
    return request.get('/messages')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(4);
        
        if (!body.find(msg => msg.content === newMessage && msg.title === newMessage)) {
          throw new Error('message has not been created');
        }
      });
  });
});

describe('DELETE /messages/:id', () => {
  it('should get messages properly', async () => {
    await sleep(2000);
    return request.delete(`/messages/${messageId}`)
      .expect(200);
  });

  it('should not retrieve new message in GET /messages', async () => {
    await sleep(2000);
    return request.get('/messages')
      .expect(200)
      .expect(({ body }) => {
        expect(body.length).toBe(3);
        
        if (body.find(msg => msg.content === newMessage)) {
          throw new Error('message has not been created');
        }
      });
  });
});