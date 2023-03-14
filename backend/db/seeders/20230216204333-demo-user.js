'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        firstName: 'Cloud',
        lastName: 'Strife',
        email: 'demo@user.io',
        username: 'DemoUser1',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Tifa',
        lastName: 'Lockhart',
        email: 'user1@user.io',
        username: 'DemoUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Barret',
        lastName: 'Wallace',
        email: 'user2@user.io',
        username: 'DemoUser3',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['DemoUser1', 'DemoUser2', 'DemoUser3'] }
    }, {});
  }
};
