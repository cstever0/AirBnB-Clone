'use strict';

'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    return queryInterface.bulkInsert(options, [
      {
        reviewId: 1,
        url: 'review-image1.url'
      },
      {
        reviewId: 2,
        url: 'review-image2.url'
      },
      {
        reviewId: 3,
        url: 'review-image3.url'
      },
      {
        reviewId: 4,
        url: 'review-image4.url'
      },
      {
        reviewId: 5,
        url: 'review-image5.url'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['review-image1.url', 'review-image2.url', 'review-image3.url', 'review-image4.url', 'rreview-image5.url'] }
    }, {});
  }
};
