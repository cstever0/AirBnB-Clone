'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: '2020-01-01',
        endDate: '2020-01-02'
      },
      {
        spotId: 2,
        userId: 3,
        startDate: '2020-01-01',
        endDate: '2020-01-02'
      },
      {
        spotId: 3,
        userId: 1,
        startDate: '2020-01-01',
        endDate: '2020-01-02'
      },
      {
        spotId: 4,
        userId: 1,
        startDate: '2020-01-01',
        endDate: '2020-01-02'
      },
      {
        spotId: 5,
        userId: 3,
        startDate: '2020-01-01',
        endDate: '2020-01-02'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      startDate: { [Op.in]: ['2020-01-01'] }
    }, {});
  }
};
