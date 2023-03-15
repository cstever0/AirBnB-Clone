'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1, // Cloud's Apartment
        userId: 3, // Barret
        review: 'Lovely place, great location',
        stars: 5
      },
      {
        spotId: 2, // Tifa's Apartment
        userId: 1, // Cloud
        review: 'Lovely place, great location',
        stars: 5
      },
      {
        spotId: 3, // Seventh Heaven (Barret)
        userId: 1, // Cloud
        review: 'Great place to throw a party, would recommend',
        stars: 5
      },
      {
        spotId: 4, // Tifa's House
        userId: 3, // Barret
        review: 'Lovely place, great location',
        stars: 5
      },
      {
        spotId: 5, // Cloud's House
        userId: 2, // Tifa
        review: 'Lovely place, great location',
        stars: 5
      },
      {
        spotId: 1, // Cloud's Apartment
        userId: 2, // Tifa
        review: 'I was accosted by a man in black robes mumbling something about a reunion',
        stars: 1
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Lovely place, great location', 'Lovely place, great location', 'Great place to throw a party, would recommend', 'Lovely place, great location', 'Lovely place, great location', 'I was accosted by a man in black robes mumbling something about a reunion'] }
    }, {});
  }
};
