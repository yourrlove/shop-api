'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductDetail.hasMany(models.CartItem, {
        foreignKey: 'product_detail_id',
      });
      ProductDetail.belongsTo(models.Product, {
        foreignKey: 'product_id',
      });
      //ProductDetail.hasOne(models.OrderDetail);
      ProductDetail.hasMany(models.Size, {
        foreignKey: 'product_detail_id',
        as: 'size'
      });
      ProductDetail.hasMany(models.Image, {
        foreignKey: 'product_detail_id',
        as: 'image'
      });
    }
  }
  ProductDetail.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'available'
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
  }, {
    sequelize,
    modelName: 'ProductDetail',
    timestamps: true,
    paranoid: true
  });
  return ProductDetail;
};