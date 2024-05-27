'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable (
      'users_discounts',
      {
        user_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          unique: false,
          references: {
            model: 'users',
            key: 'user_id'
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        discount_id: {
          type: Sequelize.UUID,
          primaryKey: true,
          unique: false,
          references: {
            model: 'discounts',
            key: 'discount_id'
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        used_count: {
          type: Sequelize.INTEGER,
          allowNull: true
        }
      }
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users_discounts');
  }
};
