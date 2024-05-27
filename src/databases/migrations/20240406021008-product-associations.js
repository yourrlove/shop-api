"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Product hasMany ProductDetail
    return queryInterface
      .addColumn("product_skus", "product_id", {
        type: Sequelize.UUID,
        references: {
          model: "products",
          key: "product_id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      })
      .then(() => {
        // Brand hasMany Product
        return queryInterface.addColumn("products", "brand_id", {
          type: Sequelize.UUID,
          references: {
            model: "brands",
            key: "brand_id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        // Catalouge hasMany Product
        return queryInterface.addColumn("products", "catalogue_id", {
          type: Sequelize.UUID,
          references: {
            model: "catalogues",
            key: "catalogue_id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      })
      .then(() => {
        // Tag hasMany Product
        return queryInterface.addColumn("products", "tag_id", {
          type: Sequelize.UUID,
          references: {
            model: "tags",
            key: "tag_id",
          },
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        });
      });
  },

  async down(queryInterface, Sequelize) {
    //remove Product hasMany ProductDetail
    return queryInterface
      .removeColumn("product_skus", "product_id")
      .then(() => {
        // remove Brand hasMany Product
        return queryInterface.removeColumn("products", "brand_id");
      })
      .then(() => {
        // remove Catalouge hasMany Product
        return queryInterface.removeColumn("products", "catalogue_id");
      })
      .then(() => {
        // remove Tag hasMany Product
        return queryInterface.removeColumn("products", "tag_id");
      });
  },
};
