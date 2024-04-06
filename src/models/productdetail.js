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
      ProductDetail.hasOne(models.CartItem);
      ProductDetail.belongsTo(models.Product);
      ProductDetail.hasOne(models.OrderDetail);
    }
  }
  ProductDetail.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: DataTypes.TEXT
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: DataTypes.INTEGER
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.STRING
    },
    color: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.STRING
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.STRING
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUID
    }
  }, {
    sequelize,
    modelName: 'ProductDetail',
  });
  return ProductDetail;
};