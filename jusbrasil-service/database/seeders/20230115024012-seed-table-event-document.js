"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("event_document", [
      {
        event_id: 1,
        label: "Andamento",
        description: "Expedição de Certidão.",
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
        description: "Expedição de Certidão.",
        created_at: new Date(),
      },
      {
        event_id: 3,
        label: "Andamento",
        description: "Expedição de intimação eletrônica.",
        created_at: new Date(),
      },
      {
        event_id: 4,
        label: "Andamento",
        description: "Juntada de Petição de recurso inominado",
        created_at: new Date(),
      },
      {
        event_id: 5,
        label: "Andamento",
        description: "Juntada de Petição de petição (outras}",
        created_at: new Date(),
      },
      {
        event_id: 6,
        label: "Andamento",
        description: "Disponibilizado no DJ Eletrônico em 15/06/2022",
        created_at: new Date(),
      },
      {
        event_id: 6,
        label: "Andamento",
        description: "Publicado Intimação eletrônica em 20/06/2022.",
        created_at: new Date(),
      },
      {
        event_id: 7,
        label: "Andamento",
        description: "Expedição de intimação eletrônica.",
        created_at: new Date(),
      },
      {
        event_id: 8,
        label: "Andamento",
        description: "Processo Inspecionado",
        created_at: new Date(),
      },
      {
        event_id: 8,
        label: "Andamento",
        description:
        "Julgado ocedente em parte do pedido de DOUGLAS COSTA KOEHLER - CPF: XXX.425.947-XX (REQUERENTE}.",
        created_at: new Date(),
      },
      {
        event_id: 9,
        label: "Andamento",
        description: "Expedição de Certidão.",
        created_at: new Date(),
      },
      {
        event_id: 9,
        label: "Andamento",
        description: "Conclusos para julgamento",
        created_at: new Date(),
      },
      {
        event_id: 10,
        label: "Andamento",
        description: "Juntada de Petição de réplica",
        created_at: new Date(),
      },
      {
        event_id: 11,
        label: "Andamento",
        description:
        "AudiênciConciliação realizada para 07/03/2022 14:30 Vitória - Comarca da Capital - 9º Juizado Especial Cível.",
        created_at: new Date(),
      },
      {
        event_id: 11,
        label: "Andamento",
        description: "Expedição de Certidão - Intimação.",
        created_at: new Date(),
      },
      {
        event_id: 11,
        label: "Andamento",
        description: "Juntada de Petição de petição (outras}",
        created_at: new Date(),
      },
      {
        event_id: 11,
        label: "Andamento",
        description: "Expedição de Termo de Audiência.",
        created_at: new Date(),
      },
      {
        event_id: 12,
        label: "Andamento",
        description: "Juntada de Petição de petição (outras}",
        created_at: new Date(),
      },
      {
        event_id: 13,
        label: "Andamento",
        description: "Juntada de Petição de petição (outras}",
        created_at: new Date(),
      },
      {
        event_id: 14,
        label: "Andamento",
        description: "Disponibilizado no DJ Eletrônico em 15/12/2021",
        created_at: new Date(),
      },
      {
        event_id: 14,
        label: "Andamento",
        description: "Publicado Intimação eletrônica em 16/12/2021.",
        created_at: new Date(),
      },
      {
        event_id: 15,
        label: "Andamento",
        description:
        "AudiênciConciliação redesignada para 07/03/2022 14:30 Vitória - Comarca da Capital - 9º Juizado Especial Cível.",
        created_at: new Date(),
      },
      {
        event_id: 15,
        label: "Andamento",
        description: "Expedição de intimação eletrônica.",
        created_at: new Date(),
      },
      {
        event_id: 15,
        label: "Andamento",
        description: "Expedição de carta postal - intimação.",
        created_at: new Date(),
      },
      {
        event_id: 15,
        label: "Andamento",
        description: "Proferido despacho de mero expediente",
        created_at: new Date(),
      },
      {
        event_id: 15,
        label: "Andamento",
        description: "Juntada de Petição de petição (outras}",
        created_at: new Date(),
      },
      {
        event_id: 16,
        label: "Andamento",
        description: "Conclusos para decisão",
        created_at: new Date(),
      },
      {
        event_id: 16,
        label: "Andamento",
        description: "Juntada de Petição de petição (outras}",
        created_at: new Date(),
      },
      {
        event_id: 17,
        label: "Andamento",
        description: "Juntada de Petição de contestação",
        created_at: new Date(),
      },
      {
        event_id: 17,
        label: "Andamento",
        description: "Juntada de Petição de petição (outras}",
        created_at: new Date(),
      },
      {
        event_id: 18,
        label: "Andamento",
        description: "Juntada de Outros documentos",
        created_at: new Date(),
      },
      {
        event_id: 18,
        label: "Andamento",
        description: "Juntada de Certidão",
        created_at: new Date(),
      },
      {
        event_id: 19,
        label: "Andamento",
        description: "Expedição de intimação eletrônica.",
        created_at: new Date(),
      },
      {
        event_id: 19,
        label: "Andamento",
        description: "Distribuído por sorteio",
        created_at: new Date(),
      },
      {
        event_id: 19,
        label: "Andamento",
        description: "10094065 - Petição inicial (PDF} {Douglas x BB. INICIAL}",
        created_at: new Date(),
      },
      {
        event_id: 19,
        label: "Andamento",
        description:
        "Expediçãde Certidão.\n10096330 - Certidão (AUDIÊNCIA TELEPRESENCIAL ZOOM}",
        created_at: new Date(),
      },
      {
        event_id: 19,
        label: "Andamento",
        description:
        "AudiênciConciliação designada para 15/12/2021 13:00 Vitória - Comarca da Capital - 9º Juizado Especial Cível.",
        created_at: new Date(),
      },
      {
        event_id: 19,
        label: "Andamento",
        description: "Expedição de Certidão.",
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
          [Op.in]: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19
        ],
        },
      },
      {}
    );
  },
};
