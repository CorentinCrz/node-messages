'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Messages', [
      {
        title: 'First message',
        content: 'Bla bla bla ...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Second message',
        content: 'Bla bla bla ...',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Third message',
        content: 'Bla bla bla ...',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
