'use strict';

const fs = require('fs')

const data = fs.readFileSync('db/mockData/spot-images.json',
    { encoding: 'utf8', flag: 'r' });

const dataObj = JSON.parse(data);

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, dataObj, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['image-1.url', 'image-2.url', 'image-3.url', 'image-4.url', 'image-5.url'] }
    }, {});
  }
};
