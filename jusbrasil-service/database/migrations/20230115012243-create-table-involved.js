"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("involved", {
      lawsuit_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        references: {
          model: "lawsuit",
          key: "id",
        },
      },
      perpetrator: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      acused: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      plaintif_lawyer_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "lawyer",
          key: "id",
        },
      },
      defendant_lawyer_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "lawyer",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("involved");
  },
};
