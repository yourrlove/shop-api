'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      'Cart',
      'id',
      {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        unique: true,
        references: {
          model: 'User',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    )

    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER cart_cartitem_quantity_insert
        AFTER INSERT ON CartItem
        FOR EACH ROW
        BEGIN
          UPDATE Cart 
          SET quantity = quantity + NEW.quantity
          WHERE id = NEW.cart_id;
        END;
      `
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER cart_cartitem_quantity_update
        AFTER UPDATE ON CartItem
        FOR EACH ROW
        BEGIN
          UPDATE Cart 
          SET quantity = quantity + NEW.quantity - OLD.quantity
          WHERE id = NEW.cart_id;
        END;
      `
    );
    await queryInterface.sequelize.query(
      `
      CREATE TRIGGER cart_cartitem_quantity_delete
        BEFORE DELETE ON CartItem
        FOR EACH ROW
        BEGIN
          UPDATE Cart 
          SET quantity = quantity - OLD.quantity
          WHERE id = OLD.cart_id;
        END;
      `
    );
  },

  async down (queryInterface, Sequelize) {
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
  }
};
