'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      // User Many-To-Many Notifications
      return queryInterface.createTable(
        'UserNotification', 
        {
          notification_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            references: {
              model: 'Notification',
              key: 'id'
            }
          },
          user_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'User',
              key: 'id'
            }
          },
          is_read: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
      });
  },

  async down (queryInterface, Sequelize) {
    // remove User Many-To-Many Notification
    return queryInterface.dropTable('UserNotification');
  }
};
