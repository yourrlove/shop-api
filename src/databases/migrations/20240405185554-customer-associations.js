'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User hasOne Profile
    return queryInterface.addColumn(
      'Profile',
      'user_id',
      {
        type: Sequelize.UUID,
        references: {
           model: 'User',
           key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      // remove User hasOne Profile
      return queryInterface.addColumn(
        'DeliveryInfor',
        'user_id',
        {
          type: Sequelize.UUID,
          references: {
             model: 'User',
             key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.addColumn(
        'Cart',
        'user_id',
        {
          type: Sequelize.UUID,
          allowNull: true,
          references: {
             model: 'User',
             key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      )
    })
    .then(() => {
      return queryInterface.createTable(
        'CartItem',
        {
          cart_id: {
            allowNull: false,
            unique: false,
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
               model: 'Cart',
               key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          product_detail_id: {
            allowNull: false,
            unique: false,
            type: Sequelize.UUID,
            primaryKey: true,
            references: {
               model: 'ProductDetail',
               key: 'id',
            },
            onUpdate: 'CASCADE',  
            onDelete: 'CASCADE',
          },
          quantity: {
            allowNull: false,
            type: Sequelize.INTEGER
          }
        }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    // remove User hasOne Profile
    return queryInterface.removeColumn(
      'Profile',
      'user_id',
    )
    .then(() => {
      // remove User hasMany DeliveryInfor
      return queryInterface.removeColumn(
        'DeliveryInfor',
        'user_id',
      )
    })
    .then(() => { 
      // remove User hasOne Cart
      return queryInterface.removeColumn(
        'Cart',
        'user_id',
      )
    })
    .then(() => {
      // remove CartItem
      return queryInterface.dropTable('CartItem')
    })
  }
};