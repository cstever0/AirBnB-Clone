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
        address: '123 Slums Lane',
        city: 'Sector 7',
        state: 'Midgar',
        country: 'Eastern Continent',
        lat: -33.868,
        lng: 151.214,
        name: "Cloud's Apartment",
        description: 'Small apartment, no windows, located near Seventh Heaven',
        price: 200.00
      },
      {
        ownerId: 2,
        address: '125 Slums Lane',
        city: 'Sector 7',
        state: 'Midgar',
        country: 'Eastern Continent',
        lat: -33.868,
        lng: 151.214,
        name: "Tifa's Apartment",
        description: 'Small apartment, no windows, located near Seventh Heaven',
        price: 200.00
      },
      {
        ownerId: 3,
        address: '100 Slums Lane',
        city: 'Sector 7',
        state: 'Midgar',
        country: 'Eastern Continent',
        lat: -33.868,
        lng: 151.214,
        name: 'Seventh Heaven',
        description: 'Great place, full bar, arcade, darts, and workout room',
        price: 500.00
      },
      {
        ownerId: 2,
        address: '123 Nibelheim Way',
        city: 'Nibelheim',
        state: 'North Western Area',
        country: 'Western Continent',
        lat: -33.868,
        lng: 151.214,
        name: "Tifa's House",
        description: 'great house, full kitchen, multiple bedrooms',
        price: 1.00
      },
      {
        ownerId: 1,
        address: '125 Nibelheim Way',
        city: 'Nibelheim',
        state: 'North Western Area',
        country: 'Western Continent',
        lat: -33.868,
        lng: 151.214,
        name: "Cloud's House",
        description: 'great house, full kitchen, very large living area for gatherings',
        price: 1.00
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Cloud's Apartment", "Tifa's Apartment", 'Seventh Heaven', "Tifa's House", "Cloud's House"] }
    }, {});
  }
};
