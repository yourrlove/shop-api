'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        RolePermission.belongsTo(models.Role);
        RolePermission.belongsTo(models.Permission);
    }
  }
  RolePermission.init({
    role_id: {
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
      references: {
        model: 'Role',
        key: 'id'
      }
    },
    permission_id: {
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: DataTypes.UUID,
        references: {
          model: 'Permission',
          key: 'id'
        }
    }
  }, {
    sequelize,
    modelName: 'RolePermission',
  });
  return RolePermission;
};