'use strict';
const { BadRequestError } = require('../core/error.response');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: 'role_id'
      });
      Role.belongsToMany(models.Permission, { through: 'RolePermission' });
      Role.hasMany(models.RolePermission);
    }
  }
  Role.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    name: {
      type: DataTypes.ENUM,
      allowNull: false,
      unique: true,
      values: ['admin', 'user'],
      validate: {
        isIn: {
          args: [['admin', 'user']],
          msg: "Must be admin or user"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Role',
    timestamps: false
  });
  return Role;
};