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
      DeliveryInfor.belongsTo(models.User);
      DeliveryInfor.hasMany(models.Order);
    }
  }
  DeliveryInfor.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.STRING
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.STRING
    },
    province: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.STRING
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.STRING
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.STRING
    },
    is_default: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    }
  }, {
    sequelize,
    modelName: 'DeliveryInfor',
  });
  return DeliveryInfor;
};