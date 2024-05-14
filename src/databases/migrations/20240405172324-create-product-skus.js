'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('product_skus', {
      sku_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      sku_no: {
        allowNull: true,
        unique: true,
        type: Sequelize.STRING
      },
      sku_desc: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      sku_color: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sku_size: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sku_price: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      sku_image: {
        allowNull: true,
        type: Sequelize.JSON
      },
      sku_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      sku_status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      sku_slug: {
        allowNull: true,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('product_skus');
  }
};
