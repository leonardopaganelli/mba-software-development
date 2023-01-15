"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("subject", [
      {
        id: 1,
        name: "Responsabilidade Civil",
      },
      {
        id: 2,
        name: "Indenização por dano",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      "subject",
      {
        id: {
          [Op.in]: [1, 2],
        },
      },
      {}
    );
  },
};
