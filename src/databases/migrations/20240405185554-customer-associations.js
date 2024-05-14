"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn("delivery_infors", "user_id", {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: "user_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
      .then(() => {
        return queryInterface.addColumn("carts", "user_id", {
          type: Sequelize.UUID,
          references: {
            model: "users",
            key: "user_id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        return queryInterface.createTable("cart_items", {
          cart_id: {
            allowNull: false,
            type: Sequelize.UUID,
            primaryKey: true,
            unique: false,
            references: {
              model: "carts",
              key: "cart_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          product_id: {
            allowNull: false,
            type: Sequelize.UUID,
            primaryKey: true,
            unique: false,
            references: {
              model: "products",
              key: "product_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          sku_id: {
            allowNull: false,
            unique: false,
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
              model: "product_skus",
              key: "sku_id",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
          },
          quantity: {
            allowNull: false,
            type: Sequelize.INTEGER,
          },
        });
      });
  },

  async down(queryInterface, Sequelize) {
    // remove User hasMany DeliveryInfor
    return queryInterface
      .removeColumn("delivery_infors", "user_id")
      .then(() => {
        return queryInterface.removeColumn("carts", "user_id");
      })
      .then(() => {
        // remove CartItem
        return queryInterface.dropTable("cart_items");
      });
  },
};
