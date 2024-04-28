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
      User.hasOne(models.Profile);
      User.hasMany(models.DeliveryInfor);
      User.hasOne(models.Cart, {
        foreignKey: 'user_id'
      });
      User.hasMany(models.ProductEntry);
      User.hasMany(models.Order);
      User.belongsToMany(models.Notification, { through: 'UserNotification' });
      User.hasMany(models.UserNotification);
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash_password: {
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
    timestamps: true,
    paranoid: true
  });
  return User;
};