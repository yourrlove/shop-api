'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    static associate(models) {
      // Define foreign key associations here
      OrderDetail.belongsTo(models.ProductDetail, {
          foreignKey: 'product_detail_id', // Tên của cột khóa ngoại trong bảng OrderDetail
          targetKey: 'id' // Tên của cột khóa chính trong bảng ProductDetail
      });
      OrderDetail.belongsTo(models.Orders, {
          foreignKey: 'order_id', // Tên của cột khóa ngoại trong bảng OrderDetail
          targetKey: 'id' // Tên của cột khóa chính trong bảng Orders
      });
    }
  }
  OrderDetail.init({
    order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    product_detail_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'OrderDetail',
    tableName: 'OrderDetail',
    timestamps: false,
    //freezeTableName: true,
  });
  return OrderDetail;
};
