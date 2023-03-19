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
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860963/cloud_tifa_apartments_nziyy1.png",
        preview: true,
      },
      {
        spotId: 1,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860996/midgar_city_nm1szf.jpg",
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860984/clouds_apartment_door_sny6zb.webp',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860984/clouds_apartment_door_sny6zb.webp',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860984/clouds_apartment_door_sny6zb.webp',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860963/cloud_tifa_apartments_nziyy1.png',
        preview: true,
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860996/midgar_city_nm1szf.jpg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/tifas_apartment_ypusox.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/tifas_apartment_ypusox.png",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/tifas_apartment_ypusox.png",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/seventh_heaven_sfmoun.jpg",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/seventh_heaven_sfmoun.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860996/midgar_city_nm1szf.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860996/midgar_city_nm1szf.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860996/midgar_city_nm1szf.jpg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/nibelheim_town_gc2epm.webp",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/tifas_house_entrance_phxtc1.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/tifas_house_upstairs_gkh7sp.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/tifas_house_upstairs_gkh7sp.webp",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/tifas_house_upstairs_gkh7sp.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678861007/nibelheim_town_gc2epm.webp",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860989/clouds_house_teyrmi.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860989/clouds_house_teyrmi.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860989/clouds_house_teyrmi.webp",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://res.cloudinary.com/dxcayvj3l/image/upload/v1678860989/clouds_house_teyrmi.webp",
        preview: false,
      }
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
