'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User hasMany Orders
    return queryInterface.addColumn(
      'Order',
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
    .then(() => {
      // Order hasOne DeliveryInfor
      return queryInterface.addColumn(
        'Invoice',
        'delivery_id',
        {
          type: Sequelize.UUID,
          references: {
            model: 'DeliveryInfor',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
    })
    .then(() => {
      // Order - OrderDetail - ProductDetail
      return queryInterface.createTable(
        'OrderDetail',
        {
          order_id: {
            type: Sequelize.UUID,
            unique: false,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'Order',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          product_detail_id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'ProductDetail',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
          }
        }
      )
    })
    .then(() => {
      // Order - Promotion
      return queryInterface.addColumn(
        'Order',
        'promotion_id',
        {
          type: Sequelize.UUID,
          references: {
            model: 'Promotion',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }

      );
    })
    .then(() => {
      // Invoice - Invoice Details - Product Details
      return queryInterface.createTable(
        'InvoiceDetail',
        {
          invoice_id: {
            type: Sequelize.UUID,
            unique: false,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'Invoice',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          product_detail_id: {
            type: Sequelize.UUID,
            unique: true,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'ProductDetail',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
          },
          quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
          }
        }
      )
    })
    .then(() => {
      //Invoice - Order
      return queryInterface.addColumn(
        'Invoice',
        'order_id',
        {
          type: Sequelize.UUID,
          references: {
            model: 'Order',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    // remove User hasMany Orders
    return queryInterface.removeColumn(
      'Order',
      'user_id'
    )
    .then(() => {
      // remove Order hasOne DeliveryInfor
      return queryInterface.removeColumn(
        'Invoice',
        'delivery_id'
      )
    }).then(() => {
      // remove Order - OrderDetail - ProductDetail
      return queryInterface.dropTable('OrderDetail')
    })
    .then(() => {
      // remove Order - Promotion
      return queryInterface.removeColumn(
        'Order',
        'promotion_id'
      )
    })
    .then(() => {
      // remove Invoice - Invoice Details - Product Details
      return queryInterface.dropTable('InvoiceDetail')
    })
  }
};
