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
      type: DataTypes.UUID,
    },
    deposit: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Promotion',
    timestamps: true
  });
  return Promotion;
};