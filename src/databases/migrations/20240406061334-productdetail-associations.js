"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Brand hasMany Product
    return queryInterface
      .addColumn("Size", "product_detail_id", {
        type: Sequelize.UUID,
        references: {
          model: "ProductDetail",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
      .then(() => {
        // Catalouge hasMany Product
        return queryInterface.addColumn("Image", "product_detail_id", {
          type: Sequelize.UUID,
          references: {
            model: "ProductDetail",
            key: "id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Size", "product_detail_id").then(() => {
      return queryInterface.removeColumn("Image", "product_detail_id");
    });
  },
};
