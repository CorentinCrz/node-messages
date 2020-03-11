import "regenerator-runtime/runtime";
import message from '../../src/controllers/message';
// import db from '../../src/models/db';

const responseMock = {}

const mockMessages = [
  { id: 1, title: 'first title', content: 'first message' },
  { id: 2, title: 'title', content: 'test' },
];
const mockMessage = { id: 3, title: 'title', content: 'test' };
const mockDestroy = true;
const mockUpdate = [true];

jest.mock('../../src/models/db', () => ({ message: { 
    findAll: () => new Promise(resolve => resolve(mockMessages)),
    create: () => new Promise(resolve => resolve(mockMessage)),
    destroy: () => new Promise(resolve => resolve(mockDestroy)),
    update: () => new Promise(resolve => resolve(mockUpdate)),
  }} 
));

test('get messages', async () => {
  responseMock.send = response => {
    expect(response.length).toBe(2);
    expect(JSON.stringify(response)).toBe(JSON.stringify(mockMessages));
    return responseMock;
  };

  const response = await message.get(null, responseMock);

  expect(response).toBe(responseMock);
});

test('post message', async () => {
  responseMock.send = response => {
    expect(JSON.stringify(response)).toBe(JSON.stringify(mockMessage));
  };
  responseMock.status = status => {
    expect(status).toBe(201);
    return responseMock;
  };

  const {title, content} = mockMessage;
  const response = await message.post({body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});

test('delete message', async () => {
  responseMock.send = response => {
    expect(response).toBe('deleted');
    return responseMock;
  };

  const {title, content} = mockMessage;
  const id = 1;
  const response = await message.delete({params: {id}, body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});

test('update message', async () => {
  responseMock.send = response => {
    expect(response).toBe('uptated');
    return responseMock;
  };

  const {title, content} = mockMessage;
  const id = 1;
  const response = await message.update({params: {id}, body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});