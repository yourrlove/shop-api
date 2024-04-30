'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.Cart, {
        foreignKey: 'cart_id',
      });
      // CartItem.belongsTo(models.ProductDetail, {
      //   foreignKey: 'product_detail_id',
      // });
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
    product_detail_id: {
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
          model: 'ProductDetail',
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
    timestamps: false,
  });
  return CartItem;
};