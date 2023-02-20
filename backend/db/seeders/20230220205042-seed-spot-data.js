'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: 'example address # 1',
        city: 'city#1',
        state: 'state#1',
        country: 'country#1',
        lat: -33.868,
        lng: 151.214,
        name: 'name#1',
        description: 'description#1',
        price: 1.00
      },
      {
        ownerId: 2,
        address: 'example address # 2',
        city: 'city#2',
        state: 'state#2',
        country: 'country#2',
        lat: -33.868,
        lng: 151.214,
        name: 'name#2',
        description: 'description#2',
        price: 1.00
      },
      {
        ownerId: 3,
        address: 'example address # 3',
        city: 'city#3',
        state: 'state#3',
        country: 'country#3',
        lat: -33.868,
        lng: 151.214,
        name: 'name#3',
        description: 'description#3',
        price: 1.00
      },
      {
        ownerId: 2,
        address: 'example address # 4',
        city: 'city#4',
        state: 'state#4',
        country: 'country#4',
        lat: -33.868,
        lng: 151.214,
        name: 'name#4',
        description: 'description#4',
        price: 1.00
      },
      {
        ownerId: 1,
        address: 'example address # 5',
        city: 'city#5',
        state: 'state#5',
        country: 'country#5',
        lat: -33.868,
        lng: 151.214,
        name: 'name#5',
        description: 'description#5',
        price: 1.00
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
