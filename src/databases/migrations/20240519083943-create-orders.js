"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("orders", {
      order_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      order_total_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      order_discount_amount: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      order_shipping_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      order_final_price: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      order_payment_method: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      order_status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["pending", "confirmed", "cancelled", "shipped", "delivered"],
        defaultValue: "pending",
      },
      order_province: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      order_city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      order_district: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      order_street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("orders");
  },
};
