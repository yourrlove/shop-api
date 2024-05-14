"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER cart_cartitem_quantity_insert
        AFTER INSERT ON cart_items
        FOR EACH ROW
        BEGIN
          UPDATE carts 
          SET total_quantity = total_quantity + NEW.quantity
          WHERE cart_id = NEW.cart_id;
        END;
      `
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER cart_cartitem_quantity_update
        AFTER UPDATE ON cart_items
        FOR EACH ROW
        BEGIN
          UPDATE carts 
          SET total_quantity = total_quantity + NEW.quantity - OLD.quantity
          WHERE cart_id = NEW.cart_id;
        END;
      `
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER cart_cartitem_quantity_delete
        BEFORE DELETE ON cart_items
        FOR EACH ROW
        BEGIN
          UPDATE carts 
          SET total_quantity = total_quantity - OLD.quantity
          WHERE cart_id = OLD.cart_id;
        END;
      `
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER cart_item_quantity_check
        BEFORE UPDATE ON cart_items
        FOR EACH ROW
        BEGIN
          IF NEW.quantity < 0 THEN
            SET NEW.quantity = 0;
          END IF;
        END;
      `
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      `
      DROP TRIGGER cart_cartitem_quantity_insert;
      `
    );
    await queryInterface.sequelize.query(
      `
      DROP TRIGGER cart_cartitem_quantity_update;
      `
    );
    await queryInterface.sequelize.query(
      `
      DROP TRIGGER cart_cartitem_quantity_delete;
      `
    );
    await queryInterface.sequelize.query(
      `
      DROP TRIGGER cart_item_quantity_check;
      `
    );
  },
};
