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
      OrderDetail.belongsTo(models.ProductDetail);
      OrderDetail.belongsTo(models.Order);
    }
  }
  OrderDetail.init({
    order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'Order',
            key: 'order_id'
        }
    },
    product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'ProductDetail',
            key: 'product_id'
        }
    }
  }, {
    sequelize,
    modelName: 'ProductDetail',
  });
  return OrderDetail;
};