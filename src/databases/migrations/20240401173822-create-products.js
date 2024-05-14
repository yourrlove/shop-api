'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      product_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      product_name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      product_desc: {
        allowNull: true,
        type: Sequelize.TEXT
      },
      product_quantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      product_status: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      product_price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      product_rating: {
        allowNull: true,
        type: Sequelize.FLOAT
      },
      product_slug: {
        allowNull: true,
        type: Sequelize.STRING,
        unique: true
      },
      product_thumb: {
        allowNull: true,
        type: Sequelize.JSON
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
    await queryInterface.dropTable('products');
  }
};