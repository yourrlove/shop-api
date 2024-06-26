"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("orders", "user_id", {
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "user_id",
      },
    });
    await queryInterface.addColumn("orders", "discount_id", {
      type: Sequelize.UUID,
      references: {
        model: "discounts",
        key: "discount_id",
      },
    });
    await queryInterface.createTable("order_details", {
      order_id: {
        type: Sequelize.UUID,
        references: {
          model: "orders",
          key: "order_id",
        },
      },
      sku_id: {
        type: Sequelize.UUID,
        references: {
          model: "product_skus",
          key: "sku_id",
        },
      },
      order_detail_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      order_detail_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("orders", "user_id");
    await queryInterface.removeColumn("orders", "discount_id");
    await queryInterface.dropTable("order_details");
  },
};
