'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER product_total_quantity_insert
        AFTER INSERT ON ProductDetail
        FOR EACH ROW
        BEGIN
          UPDATE Product
          SET quantity = quantity + NEW.quantity
          WHERE id = NEW.product_id;
        END;
      `    
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER product_total_quantity_update
        BEFORE UPDATE ON ProductDetail
        FOR EACH ROW
        BEGIN
          UPDATE Product
          SET quantity = quantity - OLD.quantity + NEW.quantity
          WHERE id = NEW.product_id;
        END;
      `
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER product_total_quantity_delete
        BEFORE DELETE ON ProductDetail
        FOR EACH ROW
        BEGIN
          UPDATE Product
          SET quantity = quantity - OLD.quantity
          WHERE id = OLD.product_id;
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