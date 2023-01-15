"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "court",
      [
        {
          name: "Tribunal de Justiça do Espírito Santo",
          alias: "TJES",
          city: "Vitória",
          state: "Espírito Santo",
        }
      ]
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      "court",
      {
        id: {
          [Op.in]: [1]
        }
      },
      {}
    );
  }
};
