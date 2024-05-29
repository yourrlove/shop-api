'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductEntryDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductEntryDetail.belongsTo(models.ProductEntry);
      ProductEntryDetail.belongsTo(models.ProductDetail);
    }
  }
  ProductEntryDetail.init({
    product_entry_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'product_entry',
        key: 'product_entry_id'
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
    entry_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    entry_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'ProductEntryDetail',
    tableName: 'product_entry_details',
    timestamps: false
  });
  return ProductEntryDetail;
};