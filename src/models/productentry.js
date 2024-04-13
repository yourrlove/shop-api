'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProductEntry.belongsTo(models.User);
      ProductEntry.belongsToMany(models.Product, { through: 'ProductEntryDetail' });
      ProductEntry.hasMany(models.ProductEntryDetail);
    }
  }
  ProductEntry.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0
    },
    total_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'ProductEntry',
    timestamps: true
  });
  return ProductEntry;
};