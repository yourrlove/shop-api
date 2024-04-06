'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(Role, {
        foreignKey: 'role_id',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      });
      User.hasOne(models.Profile);
      User.hasMany(models.DeliveryInfor);
      User.hasOne(models.Cart);
      User.hasMany(models.ProductEntry);
      User.hasMany(models.Order);
      User.belongsToMany(models.Notification, { through: 'UserNotification' });
      User.hasMany(models.UserNotification);
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    username: {
      types: DataTypes.STRING,
      defaultValue: DataTypes.STRING,
      allowNull: false
    },
    email: {
      types: DataTypes.STRING,
      defaultValue: DataTypes.STRING,
      allowNull: false
    },
    hash_password: {
      types: DataTypes.STRING,
      defaultValue: DataTypes.STRING,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true
    },
    role_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: true
    }

  }, {
    sequelize,
    modelName: 'User',
    timestamps: true
  });
  return User;
};