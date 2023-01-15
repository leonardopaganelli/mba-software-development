"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("lawsuit", [
      {
        id: "502XXXX-21.2021.8.08.0024",
        nature: "Procedimento do juizado especial cível",
        judicial_branch:
          "Justiça dos Estados e do Distrito Federal e Territórios",
        init_date: "2021-10-29",
        amount_in_controversy: 3000,
        court_id: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      "lawsuit",
      {
        id: {
          [Op.in]: ["502XXXX-21.2021.8.08.0024"],
        },
      },
      {}
    );
  },
};
