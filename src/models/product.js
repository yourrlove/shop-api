'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.ProductDetail, {
        foreignKey: 'product_id',
      });
      Product.belongsTo(models.Brand, {
        foreignKey: 'brand_id',
      });
      Product.belongsTo(models.Category, {
        foreignKey: 'category_id',
      });
      Product.belongsToMany(models.ProductEntry, { through: 'ProductEntryDetail' });
      Product.hasMany(models.ProductEntryDetail);
    }
  }
  Product.init({
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
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
      allowNull: false,
      defaultValue: 'available'
    },
    current_unit_price: {
      type: DataTypes.FLOAT,
      allowNull: true,
      defaultValue: 0
    },
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    brand_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Brand',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  });
  return Product;
};