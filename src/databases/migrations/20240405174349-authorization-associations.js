'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User belongs to Role
    return queryInterface.addColumn(
      'User',
      'role_id',
      {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Role',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    )
    .then(() => {
      // Role belongsToMany Permissions
      return queryInterface.createTable(
        'RolePermission',
        {
          role_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'Role',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          permission_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            references: {
              model: 'Permission',
              key: 'id',
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
      'User',
      'role_id'
    )
    .then(() => {
      // remove Role belongsToMany Permissions
      return queryInterface.dropTable('RolePermission')
    })
  }
};
