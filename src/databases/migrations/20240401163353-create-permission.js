'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Permission', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      method: {
        type: Sequelize.STRING,
        allowNull: false
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Permission');
  }
};