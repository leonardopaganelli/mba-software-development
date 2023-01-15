"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("event_document", [
      {
        event_id: 1,
        label: "Andamento",
        description: "Expedição de Certidão",
        created_at: new Date(),
      },
      {
        event_id: 2,
        label: "Andamento",
        description: "Juntada de Petição de contrarrazões",
        created_at: new Date(),
      },
      {
        event_id: 3,
        label: "Andamento",
        description: "Expedição de Certidão",
        created_at: new Date(),
      },
      {
        event_id: 3,
        label: "Andamento",
        description: "Expedição de intimação eletrônica",
        created_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(
      "event_document",
      {
        event_id: {
          [Op.in]: [1,2,3],
        },
      },
      {}
    );
  },
};
