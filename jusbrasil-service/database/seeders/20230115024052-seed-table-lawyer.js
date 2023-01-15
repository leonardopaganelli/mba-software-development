"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("lawyer", [
      {
        id: "OAB 6739/ES",
        name: "Jerize Terciano de Almeida",
      },
      {
        id: "OAB 7716/MG",
        name: "Ricardo Lopes Godoy",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      "lawyer",
      {
        id: {
          [Op.in]: ["OAB 6739/ES", "OAB 7716/MG"],
        },
      },
      {}
    );
  },
};
