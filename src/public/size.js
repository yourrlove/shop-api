'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Size.belongsTo(models.ProductDetail, {
        foreignKey: 'product_detail_id',
      })
    }
  }
  Size.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
    },
    type: {
        type: DataTypes.STRING,
        unique: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    product_detail_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Size',
    timestamps: false,
    paranoid: true
  });
  return Size;
};