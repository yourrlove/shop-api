'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cart_id'
      });
      Cart.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  Cart.init({
    cart_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    tableName: 'carts',
    timestamps: false
  });
  return Cart;
};