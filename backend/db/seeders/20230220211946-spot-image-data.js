'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1, //image url worked
        url: 'https://ams0.files.sfmlab.com/content/content/image/preview2_dAz5vX1.png?AWSAccessKeyId=YALKTSWDUPLBGUZZ&Signature=ZWb6u2t0Na0aIx2F3rO84vp%2FqRE%3D&Expires=1678797510',
        preview: true,
      },
      {
        spotId: 1,
        url: "image.url",
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://www.deviantart.com/oo-fil-oo/art/FF7-REM-CLOUD-AND-TIFA-APPARTMENTS-842241658',
        preview: false,
      },
      {
        spotId: 2, //image url worked
        url: 'https://ams0.files.sfmlab.com/content/content/image/preview2_dAz5vX1.png?AWSAccessKeyId=YALKTSWDUPLBGUZZ&Signature=ZWb6u2t0Na0aIx2F3rO84vp%2FqRE%3D&Expires=1678797510',
        preview: true,
      },
      {
        spotId: 2, // image url worked
        url: "image.url",
        preview: false,
      },
      {
        spotId: 2,
        url: "image.url",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://finalfantasy.fandom.com/wiki/Seventh_Heaven_(Final_Fantasy_VII)?file=Seventh_Heaven_from_FFVII_Remake.jpg",
        preview: true,
      },
      {
        spotId: 3,
        url: "image.url",
        preview: false,
      },
      {
        spotId: 3,
        url: "image.url",
        preview: false,
      },
      {
        spotId: 4,
        url: "image.url",
        preview: true,
      },
      {
        spotId: 4,
        url: "image.url",
        preview: false,
      },
      {
        spotId: 4,
        url: "image.url",
        preview: false,
      },
      {
        spotId: 5,
        url: "image.url",
        preview: true,
      },
      {
        spotId: 5,
        url: "image.url",
        preview: false,
      },
      {
        spotId: 5,
        url: "image.url",
        preview: false,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      url: { [Op.in]: ['image-1.url', 'image-2.url', 'image-3.url', 'image-4.url', 'image-5.url'] }
    }, {});
  }
};
