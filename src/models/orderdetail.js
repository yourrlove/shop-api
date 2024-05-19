'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // OrderDetail.belongsTo(models.ProductDetail);
      OrderDetail.belongsTo(models.Order);
      OrderDetail.belongsTo(models.ProductDetail);
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
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
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