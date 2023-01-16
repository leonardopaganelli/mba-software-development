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
        date: "2022-08-08",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-07-19",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-07-04",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-06-26",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-06-20",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-06-14",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-05-12",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-03-29",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-23-28",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-03-07",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-03-03",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2022-01-31",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2021-12-16",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2021-12-14",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2021-12-13",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2021-12-10",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2021-11-04",
      },
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        date: "2021-10-29",
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