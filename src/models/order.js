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
      // Order.hasMany(models.OrderDetail);
      // Order.hasMany(models.Invoice);
      // Order.belongsTo(models.Promotion);
    }
  }
  Order.init({  
    order_id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    order_total_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    order_discount_amount: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    order_shipping_price: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    order_final_price: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    order_payment_method: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    order_status: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ["pending", "confirmed", "cancelled", "shipped", "delivered"],
      defaultValue: "pending",
    },
    order_province: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    order_city: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    order_district: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    order_street: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    discount_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'discounts',
        key: 'discount_id'
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: true,
  });
  return Order; 
};