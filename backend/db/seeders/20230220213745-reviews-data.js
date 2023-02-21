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
        review: 'review#1',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'review#2',
        stars: 5
      },
      {
        spotId: 3,
        userId: 3,
        review: 'review#3',
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: 'review#4',
        stars: 5
      },
      {
        spotId: 5,
        userId: 1,
        review: 'review#5',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'review#6',
        stars: 1
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['review#1', 'review#2', 'review#3', 'review#4', 'review#5'] }
    }, {});
  }
};
