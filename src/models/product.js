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
        as: 'ProductDetail',
        foreignKey: 'product_id',
      });
      Product.belongsTo(models.Brand, {
        foreignKey: 'brand_id',
      });
      Product.belongsTo(models.Catalogue, {
        foreignKey: 'catalogue_id',
      });
      Product.belongsTo(models.Tag, {
        foreignKey: 'tag_id',
      });
 
      // Product.hasMany(models.ProductEntryDetail);
    }
  }
  Product.init({
    product_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    product_name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    product_desc: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    product_quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    product_status: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'available'
    },
    product_price: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    product_rating: {
      allowNull: true,
      type: DataTypes.FLOAT,
      defaultValue: 0
    },
    product_slug: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    product_thumb: {
      allowNull: true,
      type: DataTypes.JSON,
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
    catalogue_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Catalogue',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Tag',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt']
      },
    }
  });
  return Product;
};