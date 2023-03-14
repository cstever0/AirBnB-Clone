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
        spotId: 1,
        userId: 1,
        review: 'Lovely place, great location',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Lovely place, great location',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Great place to throw a party, would recommend',
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Lovely place, great location',
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: 'Lovely place, great location',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
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
