'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User);
      Order.hasMany(models.OrderDetail);
      Order.hasMany(models.Invoice);
      Order.belongsTo(models.Promotion);
    }
  }
  Order.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending'
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    promotion_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Promotion',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
    timestamps: true,
  });
  return Order; 
};