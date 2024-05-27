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
        foreignKey: 'sku_id',
      });
      ProductDetail.belongsTo(models.Product, {
        foreignKey: 'product_id',
      });
      // //ProductDetail.hasOne(models.OrderDetail);
      // ProductDetail.hasMany(models.Size, {
      //   foreignKey: 'product_detail_id',
      //   as: 'size'
      // });
    }
  }
  ProductDetail.init({
    sku_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    sku_no: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    sku_desc: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    sku_color: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sku_size: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sku_price: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sku_image: {
      allowNull: true,
      type: DataTypes.JSON,
    },
    sku_quantity: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    sku_status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'available'
    },
    sku_slug: {
      allowNull: false,
      type: DataTypes.STRING
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'ProductDetail',
    tableName: 'product_skus',
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
    }
  });
  return ProductDetail;
};