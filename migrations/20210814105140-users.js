'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        unique: true,
        index: true,
        allowNull: false,
        validate: {
          isAlphanumeric: true,
        }
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        index: true,
        allowNull: false,
        validate: {
          is: /^[^@]+@[^@]+\.[^@]+$/i
        }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users')
  }
}
