'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Promotion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      Promotion.hasMany(models.Order);
    }
  }
  Promotion.init({
    id: {
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      type: DataTypes.UUID,
    },
    deposit: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: DataTypes.FLOAT,
    }
  }, {
    sequelize,
    modelName: 'Promotion',
    timestamps: true
  });
  return Promotion;
};