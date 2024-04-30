'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsTo(models.ProductDetail, {
        foreignKey: 'product_detail_id',
      })
    }
  }
  Image.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    product_detail_id: {
      type: DataTypes.UUID,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Image',
    timestamps: false,
    paranoid: true
  });
  return Image;
};