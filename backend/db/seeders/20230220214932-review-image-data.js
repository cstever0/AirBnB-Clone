'use strict';

const fs = require('fs')

const data = fs.readFileSync('db/mockData/review-images.json',
    { encoding: 'utf8', flag: 'r' });

const dataObj = JSON.parse(data);

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, dataObj, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['review-image1.url', 'review-image2.url', 'review-image3.url', 'review-image4.url', 'rreview-image5.url'] }
    }, {});
  }
};
