"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("involved", [
      {
        lawsuit_id: "502XXXX-21.2021.8.08.0024",
        perpetrator: "Douglas Costa Koehler",
        acused: "Banco do Brasil",
        plaintif_lawyer_id: "OAB 6739/ES",
        defendant_lawyer_id: "OAB 7716/MG",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      "involved",
      {
        lawsuit_id: {
          [Op.in]: ["502XXXX-21.2021.8.08.0024"],
        },
      },
      {}
    );
  },
};
