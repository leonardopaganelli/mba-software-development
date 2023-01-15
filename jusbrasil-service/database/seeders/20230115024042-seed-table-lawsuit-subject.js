"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("lawsuit_subject", [
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        subject_id: 1,
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        subject_id: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      "lawsuit_subject",
      {
        lawsuit_id: {
          [Op.in]: ["502XXXX-21.2021.8.08.0024"],
        },
      },
      {}
    );
  },
};
