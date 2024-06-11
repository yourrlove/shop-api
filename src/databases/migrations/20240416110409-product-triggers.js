'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER product_total_quantity_insert
        BEFORE INSERT ON product_skus
        FOR EACH ROW
        BEGIN
          UPDATE products
          SET product_quantity = product_quantity + NEW.sku_quantity
          WHERE product_id = NEW.product_id;
        END;
      `    
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER product_total_quantity_update
        BEFORE UPDATE ON product_skus
        FOR EACH ROW
        BEGIN
          UPDATE products
          SET product_quantity = product_quantity - OLD.sku_quantity + NEW.sku_quantity
          WHERE product_id = NEW.product_id;
        END;
      `
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER product_total_quantity_delete
        BEFORE DELETE ON product_skus
        FOR EACH ROW
        BEGIN
          UPDATE products
          SET product_quantity = product_quantity - OLD.sku_quantity
          WHERE product_id = OLD.product_id;
        END;
      `
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TRIGGER IF EXISTS product_total_quantity_insert;
      `    
    );
    await queryInterface.sequelize.query(
      `
      DROP TRIGGER IF EXISTS product_total_quantity_update;
      `
    );
    await queryInterface.sequelize.query(
      `
      DROP TRIGGER IF EXISTS product_total_quantity_delete;
      `
    );
  }
};