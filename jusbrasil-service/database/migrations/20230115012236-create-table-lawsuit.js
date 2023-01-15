"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lawsuit", {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      nature: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      judicial_branch: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      init_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      amount_in_controversy: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      court_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "court",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("lawsuit");
  },
};
