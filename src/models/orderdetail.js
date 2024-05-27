'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      // define association here
      // OrderDetail.belongsTo(models.ProductDetail);
      OrderDetail.belongsTo(models.Order, {
        foreignKey: 'order_id',
      });
      OrderDetail.belongsTo(models.ProductDetail, {
        foreignKey: 'sku_id',
      });
    }
  }
  OrderDetail.init({
    order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'orders',
            key: 'order_id'
        }
    },
    sku_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'product_skus',
            key: 'sku_id'
        }
    },
    order_detail_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    order_detail_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'order_details',
    timestamps: false,
  });
  return OrderDetail;
};
