"use strict";
const { Model } = require("sequelize");
const moment = require("moment");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Order.hasMany(models.OrderDetail, {
        foreignKey: "order_id",
      });
      // Order.hasMany(models.Invoice);
      Order.belongsTo(models.Discount, {
        foreignKey: "discount_id",
      });
    }
  }
  Order.init(
    {
      order_id: {
        primaryKey: true,
        type: DataTypes.UUID,
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
      //dummy text
      order_status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["Pending", "Confirmed", "Cancelled", "Shipping", "Delivered"],
        defaultValue: "Pending",
      },
      order_payment_status: {
        allowNull: false,
        type: DataTypes.ENUM,
        values: ["Unpaid", "Paid", "Cancelled"],
        defaultValue: "Unpaid",
      },
      order_code: {
        allowNull: false,
        type: DataTypes.BIGINT,
        unique: true,
      },
      order_province_city: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      order_district: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      order_ward: {
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
          model: "users",
          key: "user_id",
        },
      },
      discount_id: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: "discounts",
          key: "discount_id",
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("createdAt");
          return rawValue ? moment(rawValue).format("YYYY-MM-DD") : null;
        },
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          const rawValue = this.getDataValue("updatedAt");
          return rawValue ? moment(rawValue).format("YYYY-MM-DD") : null;
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
    }
  );
  return Order;
};
