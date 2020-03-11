import "regenerator-runtime/runtime";
import message from '../../src/controllers/message';
import db from '../../src/models/db';

jest.mock('../../src/models/db');

const responseMock = {};
const mockMessage = { id: 3, title: 'title', content: 'test' };

test('get messages', async () => {
  const mockMessages = [
    { id: 1, title: 'first title', content: 'first message' },
    { id: 2, title: 'title', content: 'test' },
  ];
  responseMock.send = response => {
    expect(response.length).toBe(2);
    expect(JSON.stringify(response)).toBe(JSON.stringify(mockMessages));
  };
  db.message.findAll.mockResolvedValue(new Promise(resolve => resolve(mockMessages)));

  await message.get(null, responseMock);
});

test('post message', async () => {
  responseMock.send = response => {
    expect(JSON.stringify(response)).toBe(JSON.stringify(mockMessage));
  };
  responseMock.status = status => {
    expect(status).toBe(201);
    return responseMock;
  };
  db.message.create.mockResolvedValue(new Promise(resolve => resolve(mockMessage)));

  const {title, content} = mockMessage;
  const response = await message.post({body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});

test('fail post message', async () => {
  const mockException = 'exception';
  responseMock.send = response => {
    expect(response).toBe(mockException);
  };
  responseMock.status = status => {
    expect([400, 201]).toContain(status);
    return responseMock;
  };
  db.message.create.mockResolvedValue(new Promise((resolve, reject) => { reject({ message: mockException }) }));

  const {title, content} = mockMessage;
  const response = await message.post({body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});

test('delete message', async () => {
  const mockDestroy = true;
  responseMock.send = response => {
    expect(response).toBe('deleted');
    return responseMock;
  };
  db.message.destroy.mockResolvedValue(new Promise(resolve => resolve(mockDestroy)));

  const {title, content} = mockMessage;
  const id = 1;
  const response = await message.delete({params: {id}, body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});

test('fail delete message', async () => {
  const mockDestroy = false;
  responseMock.sendStatus = response => {
    expect(response).toBe(404);
    return responseMock;
  };
  db.message.destroy.mockResolvedValue(new Promise(resolve => resolve(mockDestroy)));

  const {title, content} = mockMessage;
  const id = 1;
  const response = await message.delete({params: {id}, body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});

test('update message', async () => {
  const mockUpdate = [true];
  responseMock.send = response => {
    expect(response).toBe('uptated');
    return responseMock;
  };
  db.message.update.mockResolvedValue(new Promise(resolve => resolve(mockUpdate)));

  const {title, content} = mockMessage;
  const id = 1;
  const response = await message.update({params: {id}, body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});

test('fail update message', async () => {
  const mockException = 'exception';
  responseMock.status = response => {
    expect(response).toBe(400);
    return responseMock;
  };
  responseMock.send = response => {
    expect(response).toBe(mockException);
    return responseMock;
  };
  db.message.update.mockResolvedValue(new Promise((resolve, reject) => { reject({ message: mockException }) }));

  const {title, content} = mockMessage;
  const id = 1;
  const response = await message.update({params: {id}, body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});

test('fail 404 update message', async () => {
  const mockUpdate = [false];
  responseMock.sendStatus = response => {
    expect(response).toBe(404);
    return responseMock;
  };
  db.message.update.mockResolvedValue(new Promise(resolve => resolve(mockUpdate)));

  const {title, content} = mockMessage;
  const id = 1;
  const response = await message.update({params: {id}, body: {title, content}}, responseMock);

  expect(response).toBe(responseMock);
});