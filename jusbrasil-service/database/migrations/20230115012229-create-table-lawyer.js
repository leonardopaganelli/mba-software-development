"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lawyer", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      name: {
        type: new Sequelize.STRING(128),
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("lawyer");
  },
};
