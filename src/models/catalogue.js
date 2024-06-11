'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalogue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Catalogue.hasMany(models.Product, {
        foreignKey: 'catalogue_id',
      });
    }
  }
  Catalogue.init({
    catalogue_id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Catalogue',
    tableName: 'catalogues',
    timestamps: false,
  });
  return Catalogue;
};