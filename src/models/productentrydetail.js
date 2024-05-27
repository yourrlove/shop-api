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
      // ProductEntryDetail.belongsTo(models.ProductEntry);
      // ProductEntryDetail.belongsTo(models.Product);
    }
  }
  ProductEntryDetail.init({
    product_entry_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'ProductEntry',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Product',
        key: 'id'
      }
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    import_unit_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'ProductEntryDetail',
    tableName: 'product_entry_details',
    timestamps: true
  });
  return ProductEntryDetail;
};