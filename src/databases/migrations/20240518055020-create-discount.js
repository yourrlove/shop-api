'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
      'discounts',
      {
        discount_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID
        },
        discount_name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        discount_desc: {
          type: Sequelize.STRING,
          allowNull: true
        },
        discount_type: {
          type: Sequelize.ENUM,
          values: ['fixed_amount', 'percentage'],
          allowNull: false
        },
        discount_max_value: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        discount_value: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        discount_code: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        discount_start_date: {
          type: Sequelize.DATE,
          allowNull: false
        },
        discount_end_date: {
          type: Sequelize.DATE,
          allowNull: false
        },
        discount_max_use: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        discount_used_count: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0
        },
        discount_limit_per_user: {
          type: Sequelize.INTEGER,
          allowNull: true
        },
        discount_min_order_value: {
          type: Sequelize.FLOAT,
          allowNull: true
        },
        discount_applies_to: {
          type: Sequelize.ENUM,
          values: ['all', 'specific'],
          allowNull: true,
        },
        discount_sku_ids: {
          type: Sequelize.JSON,
          allowNull: true,
        },
        discount_is_active: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('discounts');
  }
};
