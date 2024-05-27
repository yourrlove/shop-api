'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'role_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
      User.hasMany(models.DeliveryInfor, {
        foreignKey: 'user_id'
      });
      User.hasOne(models.Cart, {
        foreignKey: 'user_id'
      });
      // User.hasMany(models.ProductEntry);
      User.hasMany(models.Order, {
        foreignKey: 'user_id'
      });
      // User.belongsToMany(models.Notification, { through: 'UserNotification' });
      // User.hasMany(models.UserNotification);
    }
  }
  User.init({
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash_password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    role_id: {
      type: DataTypes.UUID,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    paranoid: true
  });
  return User;
};