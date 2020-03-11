import {home} from '../../src/controllers/home';

const responseMock = {}

test('get home', () => {
  responseMock.send = response => {
    expect(JSON.stringify(response)).toBe(JSON.stringify({
      page: 'home',
      status: 'on'
    }));
    return responseMock;
  };

  const response = home(null, responseMock);

  expect(response).toBe(responseMock);
});