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
      Cart.belongsTo(models.User, {
        foreignKey: 'user_id'
      });
      Cart.hasMany(models.CartItem, {
        foreignKey: 'cart_id'
      });
    }
  }
  Cart.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: false
  });
  return Cart;
};