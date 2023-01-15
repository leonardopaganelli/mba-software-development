"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lawsuit_event", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      date: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lawsuit_id: {
        type: Sequelize.STRING,
        references: {
          model: "lawsuit",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("lawsuit_event");
  },
};
