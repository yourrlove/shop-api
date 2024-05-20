'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DeliveryInfor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DeliveryInfor.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
      // DeliveryInfor.hasMany(models.Invoice);
    }
  }
  DeliveryInfor.init({
    delivery_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    province_city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ward: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'DeliveryInfor',
    tableName: 'delivery_infors',
    timestamps: false,
  });
  return DeliveryInfor;
};