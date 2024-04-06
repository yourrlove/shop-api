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
      Order.belongsTo(models.DeliveryInfor);
      Order.hasMany(models.OrderDetail);
      Order.belongsTo(models.Promotion);
    }
  }
  Order.init({
    id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
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
    delivery_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    delivery_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'DeliveryInfor',
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
    }
  }, {
    sequelize,
    modelName: 'Order',
    timestamps: true,
    updatedAt: false,
  });
  return Order; 
};