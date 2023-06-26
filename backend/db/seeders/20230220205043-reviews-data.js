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
      { spotId: 8, userId: 3, review: "Vivamus vestibulum sagittis sapien.", stars: 2 },
      { spotId: 14, userId: 2, review: "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", stars: 5 },
      { spotId: 9, userId: 5, review: "In sagittis dui vel nisl. Duis ac nibh.", stars: 4 },
      { spotId: 5, userId: 14, review: "Proin at turpis a pede posuere nonummy.", stars: 5 },
      { spotId: 9, userId: 2,review: "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.", stars: 1 },
      { spotId: 19, userId: 11, review: "In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.", stars: 5 },
      { spotId: 19, userId: 14, review: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", stars: 2 },
      { spotId: 2, userId: 7, review: "Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.", stars: 5 },
      { spotId: 2, userId: 4, review: "Phasellus in felis.", stars: 2 },
      { spotId: 15, userId: 2, review: "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.", stars: 5 },
      { spotId: 13, userId: 11, review: "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum.", stars: 1 },
      { spotId: 6, userId: 12, review: "Sed ante. Vivamus tortor. Duis mattis egestas metus.", stars: 1 },
      { spotId: 18, userId: 4, review: "Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante.", stars: 2 },
      { spotId: 18, userId: 12, review: "Pellentesque viverra pede ac diam.", stars: 1 }
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
