"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("lawsuit_subject", {
      lawsuit_id: {
        type: Sequelize.STRING,
        references: {
          model: "lawsuit",
          key: "id",
        },
      },
      subject_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "subject",
          key: "id",
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("lawsuit_subject");
  },
};
