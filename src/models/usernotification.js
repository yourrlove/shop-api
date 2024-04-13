'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      UserNotification.belongsTo(models.Notification);
      UserNotification.belongsTo(models.User);
    }
  }
  UserNotification.init({
    notification_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'Notification',
        key: 'id'
      }
    },
    user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
  }, {
    sequelize,
    modelName: 'UserNotification',
  });
  return UserNotification;
};