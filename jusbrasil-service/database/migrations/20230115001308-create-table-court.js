"use strict";

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("court", {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
      alias: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
      city: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
      state: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
    });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface) {
    await queryInterface.dropTable("court");
  }
};
