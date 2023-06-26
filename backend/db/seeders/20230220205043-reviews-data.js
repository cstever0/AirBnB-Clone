'use strict';

const fs = require('fs')

const data = fs.readFileSync('db/mockData/reviews.json',
    { encoding: 'utf8', flag: 'r' });

const dataObj = JSON.parse(data);

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, dataObj, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      review: { [Op.in]: ['Lovely place, great location', 'Lovely place, great location', 'Great place to throw a party, would recommend', 'Lovely place, great location', 'Lovely place, great location', 'I was accosted by a man in black robes mumbling something about a reunion'] }
    }, {});
  }
};
