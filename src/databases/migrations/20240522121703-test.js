'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(
      'order_details',
      'quantity',
      'order_detail_quantity',
    );
    await queryInterface.renameColumn(
      'order_details',
      'price',
      'order_detail_price',
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
