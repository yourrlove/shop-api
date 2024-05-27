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

    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER update_order_total_price
      AFTER INSERT ON orderdetail
      FOR EACH ROW
      BEGIN
          DECLARE order_total DECIMAL(10, 2);
      
          SELECT SUM(orderdetail.quantity * product.current_unit_price) INTO order_total
          FROM orderdetail
          JOIN productdetail ON orderdetail.product_detail_id = productdetail.id
          JOIN product ON productdetail.product_id = product.id
          WHERE orderdetail.order_id = NEW.order_id;
      
          UPDATE Orders
          SET total_price = order_total
          WHERE id = NEW.order_id;
      END;
      `
    );

    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER update_product_and_ProductDetail_quantity
      AFTER INSERT ON orderdetail
      FOR EACH ROW
      BEGIN
          -- Update quantity in ProductDetail
          UPDATE productdetail
          SET quantity = quantity - NEW.quantity
          WHERE id = NEW.product_detail_id;
      END;
      `
    )
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
    await queryInterface.sequelize.query(
      'DROP TRIGGER IF EXISTS update_order_total_price'
    );
    await queryInterface.sequelize.query(
      'DROP TRIGGER IF EXISTS update_product_and_ProductDetail_quantity'
    )
  }
};