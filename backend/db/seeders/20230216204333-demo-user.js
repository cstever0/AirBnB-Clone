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
      },
      { firstName: "Mollie", lastName: "Kolak", email: "mkolak0@sourceforge.net", username: "mkolak0", hashedPassword: bcrypt.hashSync("aH8|wM<,kuKL%Qx") },
      { firstName: "Miguelita", lastName: "Jerisch", email: "mjerisch1@surveymonkey.com", username: "mjerisch1", hashedPassword: bcrypt.hashSync("bE2?4|BMP}wO") },
      { firstName: "Pepita", lastName: "Stolz", email: "pstolz2@xinhuanet.com", username: "pstolz2", hashedPassword: bcrypt.hashSync("zB0)|{<p4@aOO~_h") },
      { firstName: "Karlis", lastName: "Jorry", email: "kjorry3@myspace.com", username: "kjorry3", hashedPassword: bcrypt.hashSync("zT5=2v2*T>Gr@!jg") },
      { firstName: "Lila", lastName: "Riditch", email: "lriditch4@epa.gov", username: "lriditch4", hashedPassword: bcrypt.hashSync("pY1#d(.t\\y9}JTM") },
      { firstName: "Feodor", lastName: "Yushkin", email: "fyushkin5@vk.com", username: "fyushkin5", hashedPassword: bcrypt.hashSync("jY8/np!753") },
      { firstName: "Collen", lastName: "Ponter", email: "cponter6@ft.com", username: "cponter6", hashedPassword: bcrypt.hashSync("fM4$jzzlc") },
      { firstName: "Terra", lastName: "Sawrey", email: "tsawrey7@telegraph.co.uk", username: "tsawrey7", hashedPassword: bcrypt.hashSync("cB5|jb\"6?on") },
      { firstName: "Kass", lastName: "Broomer", email: "kbroomer8@desdev.cn", username: "kbroomer8", hashedPassword: bcrypt.hashSync("sI8)rAi21/P>d") },
      { firstName: "Olivero", lastName: "Burchall", email: "oburchall9@blogger.com", username: "oburchall9", hashedPassword: bcrypt.hashSync("zC8'QFf?,J{O") },
      { firstName: "Christina", lastName: "O'Gorman", email: "cogormana@sciencedaily.com", username: "cogormana", hashedPassword: bcrypt.hashSync("kD6@MOiE5`+NKs") },
      { firstName: "Caresse", lastName: "Nehlsen", email: "cnehlsenb@ucoz.ru", username: "cnehlsenb", hashedPassword: bcrypt.hashSync("fR8($K1+&.bdQTn") }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
      }
    }, {});
  }
};
