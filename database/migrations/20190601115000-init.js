'use strict';

const fs = require('fs');
const path = require('path');
const folderPath = path.join('./', 'app/schema');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    try {
      const files = fs.readdirSync(folderPath);
      console.log(Sequelize.UUIDV1);
      console.log(files);
      console.log(',,,,,,,,,,,,,,,');

      for (const fileName of files) {
        const filepath = path.join('../../app/schema', fileName);
        const schema = require(filepath)({ Sequelize });
        await queryInterface.createTable(fileName.replace('.js', ''), schema);
      }
    } catch (e) {
      console.log(e);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropAllTables();
  },
};
