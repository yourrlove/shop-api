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
      order_status: {
        allowNull: false,
        type: Sequelize.ENUM,
        values: ["pending", "confirmed", "cancelled", "shipped", "delivered"],
        defaultValue: "pending",
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
