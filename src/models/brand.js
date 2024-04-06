'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Brand.hasMany(models.Product);
    }
  }
  Brand.init({
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
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};