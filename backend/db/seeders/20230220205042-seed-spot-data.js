'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 Slums Lane',
        city: 'Sector 7',
        state: 'Midgar',
        country: 'Eastern Continent',
        lat: -33.868,
        lng: 151.214,
        name: "Cloud's Apartment",
        description: 'Small apartment, no windows, located near Seventh Heaven',
        price: 200.00
      },
      {
        ownerId: 2,
        address: '125 Slums Lane',
        city: 'Sector 7',
        state: 'Midgar',
        country: 'Eastern Continent',
        lat: -33.868,
        lng: 151.214,
        name: "Tifa's Apartment",
        description: 'Small apartment, no windows, located near Seventh Heaven',
        price: 200.00
      },
      {
        ownerId: 3,
        address: '100 Slums Lane',
        city: 'Sector 7',
        state: 'Midgar',
        country: 'Eastern Continent',
        lat: -33.868,
        lng: 151.214,
        name: 'Seventh Heaven',
        description: 'Great place, full bar, arcade, darts, and workout room',
        price: 500.00
      },
      {
        ownerId: 2,
        address: '123 Nibelheim Way',
        city: 'Nibelheim',
        state: 'North Western Area',
        country: 'Western Continent',
        lat: -33.868,
        lng: 151.214,
        name: "Tifa's House",
        description: 'great house, full kitchen, multiple bedrooms',
        price: 1.00
      },
      {
        ownerId: 1,
        address: '125 Nibelheim Way',
        city: 'Nibelheim',
        state: 'North Western Area',
        country: 'Western Continent',
        lat: -33.868,
        lng: 151.214,
        name: "Cloud's House",
        description: 'great house, full kitchen, very large living area for gatherings',
        price: 1.00
      },
      { ownerId: 4, address: "9 Monument Hill", city: "Paledang", country: "Indonesia", lat: -6.6000226, lng: 106.79719, name: "Blackbird", description: "Nam nulla.", price: 284134.46 },
      { ownerId: 15, address: "77 6th Court", city: "Kiruru", country: "Indonesia", lat: -3.9389, lng: 134.9696, name: "Dunning", description: "Donec semper sapien a libero. Nam dui.", price: 494005.98 },
      { ownerId: 11, address: "4058 Novick Road", city: "Nanxi", country: "China", lat: 28.845626, lng: 104.969882, name: "Rieder", description: "Proin at turpis a pede posuere nonummy.", price: 848048.09 },
      { ownerId: 6, address: "424 Springview Road", city: "Anning", country: "China", lat: 24.919493, lng: 102.478494, name: "Havey", description: "Etiam faucibus cursus urna. Ut tellus.", price: 908376.60 },
      { ownerId: 1, address: "82500 Northfield Center", city: "Vacaria", country: "Brazil", lat: -28.3276327, lng: -50.9289246, name: "Arapahoe", description: "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.", price: 162029.30 },
      { ownerId: 3, address: "681 Upham Park", city: "Wang Noi", country: "Thailand", lat: 14.2524816, lng: 100.7323332, name: "Drewry", description: "Etiam pretium iaculis justo. In hac habitasse platea dictumst.", "price": 760978.43 },
      { ownerId: 1, address: "0584 Division Point", city: "Pindi Gheb", country: "Pakistan", lat: 33.237626, lng: 72.270844, name: "Erie", description: "Suspendisse potenti.", price: 447524.70 },
      { ownerId: 2, address: "6 Reindahl Lane", city: "Pai do Vento", state: "Lisboa", country: "Portugal", lat: 38.7146303, lng: -9.414533, name: "Summer Ridge", description: "Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique.", price: 746536.74 },
      { ownerId: 6, address: "85 Acker Road", city: "Besançon", state: "Franche-Comté", country: "France", lat: 47.2154159, lng: 5.9471867, name: "Golden Leaf", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit.", price: 113357.09 },
      { ownerId: 2, address: "3143 Luster Parkway", city: "Phunphin", country: "Thailand", lat: 9.1118027, lng: 99.2065202, name: "Jenifer", description: "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.", price: 723112.80 },
      { ownerId: 7, address: "9196 Crownhardt Place", city: "Horodyshche", country: "Ukraine", lat: 49.2917766, lng: 31.4465327, name: "Mesta", description: "Maecenas pulvinar lobortis est. Phasellus sit amet erat.", price: 837073.71 },
      { ownerId: 9, address: "24 Corry Trail", city: "Oropesa", country: "Peru", lat: -13.60277, lng: -71.7676089, name: "Talmadge", description: "Nullam sit amet turpis elementum ligula vehicula consequat.", price: 701089.87 },
      { ownerId: 13, address: "1 Scott Parkway", city: "Monkayo", country: "Philippines", lat: 7.8394835, lng: 126.0502748, name: "Heffernan", description: "Etiam pretium iaculis justo. In hac habitasse platea dictumst.", price: 624036.24 },
      { ownerId: 6, address: "4 Anderson Point", city: "Buôn Ma Thuột", country: "Vietnam", lat: 12.6661944, lng: 108.0382475, name: "Hansons", description: "Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.", price: 47542.54 },
      { ownerId: 14, address: "99461 Clyde Gallagher Lane", city: "Timiryazevo", country: "Kazakhstan", lat: 53.7512087, lng: 66.4866582, name: "Sycamore", description: "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.", price: 625792.31 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20] }
    }, {});
  }
};
