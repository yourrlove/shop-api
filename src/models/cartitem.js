'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cart_id',
      });
      CartItem.belongsTo(models.ProductDetail, {
        foreignKey: 'sku_id',
      });
    }
  }
  CartItem.init({
    cart_id: {
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: 'Cart',
        key: 'id',
      }
    },
    sku_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
          model: 'ProductDetail',
          key: 'id',
        }
    },
    product_id: {
      type: DataTypes.UUID,
      required: true,
      references: {
        model: 'Product',
        key: 'id',
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    sequelize,
    modelName: 'CartItem',
    tableName: 'cart_items',
    timestamps: false,
  });
  return CartItem;
};