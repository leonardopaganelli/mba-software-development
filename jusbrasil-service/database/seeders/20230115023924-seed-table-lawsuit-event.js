"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("lawsuit_event", [
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-08-14",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-08-15",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-08-19",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      "lawsuit_event",
      {
        lawsuit_id: {
          [Op.in]: ["502XXXX-21.2021.8.08.0024"],
        },
      },
      {}
    );
  },
};
