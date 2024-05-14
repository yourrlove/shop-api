'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User belongs to Role
    return queryInterface.addColumn(
      'users',
      'role_id',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'roles',
          key: 'role_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      // Role belongsToMany Permissions
      return queryInterface.createTable(
        'role_permissions',
        {
          role_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'roles',
              key: 'role_id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          permission_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'permissions',
              key: 'permission_id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        }
      )
    })
  },

  async down (queryInterface, Sequelize) {
    // remove User belongs to Role
    return queryInterface.removeColumn(
      'users',
      'role_id'
    )
    .then(() => {
      // remove Role belongsToMany Permissions
      return queryInterface.dropTable('role_permissions')
    })
  }
};
