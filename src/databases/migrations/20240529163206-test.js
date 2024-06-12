'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // await queryInterface.createTable(
    //   'product_entry_details',
    //   {
    //     product_entry_id: {
    //       type: Sequelize.UUID,
    //       references: {
    //         model: 'product_entries',
    //         key: 'product_entry_id'
    //       },
    //       onUpdate: 'CASCADE',
    //       onDelete: 'SET NULL',
    //     },
    //     sku_id: {
    //       type: Sequelize.UUID,
    //       references: {
    //         model: 'product_skus',
    //         key: 'sku_id'
    //       },
    //       onUpdate: 'CASCADE',
    //       onDelete: 'SET NULL',
    //     },
    //     entry_quantity: {
    //       type: Sequelize.INTEGER,
    //       allowNull: false,
    //       defaultValue: 0
    //     },
    //     entry_price: {
    //       type: Sequelize.INTEGER,
    //       allowNull: false,
    //       defaultValue: 0
    //     }
    //   }
    // );

    // await queryInterface.addColumn(
    //   'orders',
    //   'order_code',
    //   {
    //     allowNull: false,
    //     type: Sequelize.BIGINT,
    //     unique: true,
    //   }
    // )
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
