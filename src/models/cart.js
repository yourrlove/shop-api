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
        foreignKey: 'id',
      });
    }
  }
  Cart.init({
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'id',
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    sequelize,
    modelName: 'Cart',
    timestamps: false
  });
  return Cart;
};