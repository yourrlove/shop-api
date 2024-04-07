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
      Product.hasMany(models.ProductDetail);
      Product.belongsTo(models.Brand);
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.ProductEntry, { through: 'ProductEntryDetail' });
      Product.hasMany(models.ProductEntryDetail);
    }
  }
  Product.init({
    id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: DataTypes.TEXT
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
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.STRING
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.DATE
    },
    brand_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUID,
      references: {
        model: 'Brand',
        key: 'id'
      }
    },
    category_id: {
      type: DataTypes.UUID,
      allowNull: true,
      defaultValue: DataTypes.UUID,
      references: {
        model: 'Category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    timestamps: true,
  });
  return Product;
};