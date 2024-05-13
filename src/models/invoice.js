"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Invoice.belongsTo(models.Orders, {
        foreignKey: "order_id",
      });
      Invoice.belongsTo(models.DeliveryInfor);
    //   Invoice.hasMany(models.InvoiceDetail);
      Invoice.belongsTo(models.Promotion);
    }
  }
  Invoice.init(
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
      },
      total_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      delivery_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      order_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Orders",
          key: "id",
        },
      },
      delivery_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "DeliveryInfor",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      }
    },
    {
      sequelize,
      modelName: "Invoice",
      timestamps: true,
      updatedAt: false,
    }
  );
  return Invoice;
};
