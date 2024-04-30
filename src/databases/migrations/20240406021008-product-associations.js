'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Product hasMany ProductDetail
    return queryInterface.addColumn(
      'ProductDetail',
      'product_id',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Product',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
    .then(() => {
      // Brand hasMany Product
      return queryInterface.addColumn(
        'Product',
        'brand_id',
        {
          type: Sequelize.UUID,
          references: {
            model: 'Brand',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
    })
    .then(() => {
      // Catalouge hasMany Product
      return queryInterface.addColumn(
        'Product',
        'catalogue_id',
        {
          type: Sequelize.UUID,
          references: {
            model: 'Catalogue',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
    })
    .then(() => {
      // Tag hasMany Product
      return queryInterface.addColumn(
        'Product',
        'tag_id',
        {
          type: Sequelize.UUID,
          references: {
            model: 'Tag',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
    })
    .then(() => {
      // User(staff) - One-To-Many - ProductEntry
      return queryInterface.addColumn(
        'ProductEntry',
        'user_id',
        {
          type: Sequelize.UUID,
          references: {
            model: 'User',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
    })
    .then(() => {
      // ProductEntry - Many-To-Many - Product
      return queryInterface.createTable(
        'ProductEntryDetail',
        {
          product_entry_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'ProductEntry',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          product_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'Product',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          description: {
            type: Sequelize.STRING,
            allowNull: true
          },
          color: {
            type: Sequelize.STRING,
            allowNull: false
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
          },
          import_unit_price: {
            type: Sequelize.FLOAT,
            allowNull: false
          },
          status: {
            type: Sequelize.STRING,
            allowNull: false
          }
        }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    //remove Product hasMany ProductDetail
    return queryInterface.removeColumn(
      'ProductDetail',
      'product_id'
    )
    .then(() => {
      // remove Brand hasMany Product
      return queryInterface.removeColumn(
        'Product',
        'brand_id'
      )
    })
    .then(() => {
      // remove Catalouge hasMany Product
      return queryInterface.removeColumn(
        'Product',
        'catalogue_id'
      )
    })
    .then(() => {
      // remove Tag hasMany Product
      return queryInterface.removeColumn(
        'Product',
        'tag_id'
      )
    })
    .then(() => {
      // remove User(staff) - One-To-Many - ProductEntry
      return queryInterface.removeColumn(
        'ProductEntry',
        'user_id'
      )
    })
    .then(() => {
      // remove ProductEntry - Many-To-Many - Product
      return queryInterface.dropTable('ProductEntryDetail')
    })
  }
};
