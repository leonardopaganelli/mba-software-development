import Involved from "@models/involved.model";
import Lawsuit from "@models/lawsuit.model";
import Court from "@models/court.model";
import Lawyer from "@models/lawyer.model";
import Subject from "@models/subject.model";
import EventDocument from "@models/event_document.model";
import { database } from "@clients/database";

import { addLawsuit, findAllLawsuits, findOneLawsuit, removeLawsuit, updateLawsuit } from "@services/lawsuit.service";
import LawsuitSubject from "@models/lawsuit_subject.model";
import LawsuitEvent from "@models/lawsuit_event.model";
import validateLawsuitInput from "@validators/validateLawsuitInput";

jest.mock("../database/models/lawsuit.model", () => ({
  init: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
  destroy: jest.fn(),
  update: jest.fn(),
  create: jest.fn()
}));
jest.mock("../database/models/involved.model", () => ({
  init: jest.fn(),
  create: jest.fn(),
}));
jest.mock("../database/models/court.model", () => ({
  init: jest.fn(),
}));
jest.mock("../database/models/subject.model", () => ({
  init: jest.fn(),
}));
jest.mock("../database/models/lawsuit_subject.model", () => ({
  init: jest.fn(),
  belongsTo: jest.fn(),
  findAll: jest.fn(),
}));
jest.mock("../database/models/lawsuit_event.model", () => ({
  init: jest.fn(),
  belongsTo: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
}));

jest.mock("../database/models/lawyer.model", () => ({
  init: jest.fn(),
}));
jest.mock("../database/models/event_document.model", () => ({
  init: jest.fn(),
}));
jest.mock("../validators/validateLawsuitInput", () => ({
  validateLawsuit: jest.fn()
}))

jest.mock("../clients/database", () => ({
  database: {
    transaction: jest.fn((callback) => callback)
  }
}))

describe("Lawsuit Service", () => {
  it("return all lawusuits", async () => {
    jest.spyOn(Lawsuit, "findAll").mockResolvedValueOnce([]);

    await findAllLawsuits();
    expect(Lawsuit.findAll).toHaveBeenCalledWith({
      attributes: {
        exclude: ["court_id"],
      },
      include: [
        {
          model: Involved,
          attributes: ["acused"],
        },
      ],
      raw: true,
    });
  });

  it("return specific lawsuit", async () => {
    const lawsuitMock = {};
    const subjectMock = [{ Subject: {} }];
    const eventMock = [
      {
        date: "12-12-2022",
        EventDocuments: {
          event_id: "1",
          label: "label",
          description: "description",
          created_at: "12-12-2022",
        },
      },
      {
        date: "12-12-2022",
        EventDocuments: {
          event_id: "1",
          label: "label 2",
          description: "description 2",
          created_at: "12-12-2022",
        },
      },
    ]
    jest.spyOn(Lawsuit, "findOne").mockResolvedValueOnce(lawsuitMock as any);
    jest.spyOn(LawsuitSubject, "findAll").mockResolvedValueOnce(subjectMock as any[]);
    jest.spyOn(LawsuitEvent, "findAll").mockResolvedValueOnce(eventMock as any[]);

    const mockId = "1";

    const lawsuitSubjectParameters = {
      where: {
        lawsuit_id: mockId,
      },
      attributes: {
        exclude: ["courtId"],
      },
      include: [
        {
          model: Subject,
        },
      ],
      raw: true,
      nest: true,
    };
    const lawsuitEventParameters = {
      attributes: ["date"],
      where: {
        lawsuit_id: mockId,
      },
      include: [
        {
          model: EventDocument,
        },
      ],
      raw: true,
      nest: true,
    };
    const lawsuitParameters = {
      where: { id: mockId },
      attributes: {
        exclude: ["courtId", "court_id"],
      },
      include: [
        {
          model: Court,
        },
        {
          model: Involved,
          attributes: ["perpetrator", "acused"],
          include: [
            {
              model: Lawyer,
              as: "plaintifLawyer",
            },
            {
              model: Lawyer,
              as: "defendantLawyer",
            },
          ],
        },
      ],
      raw: true,
      nest: true,
    };

    await findOneLawsuit(mockId);

    expect(LawsuitSubject.findAll).toHaveBeenCalledWith(
      lawsuitSubjectParameters
    );
    expect(LawsuitEvent.findAll).toHaveBeenCalledWith(lawsuitEventParameters);
    expect(Lawsuit.findOne).toHaveBeenCalledWith(lawsuitParameters);
  });

  it("create lawsuit", async () => {
    const addMock = {
      id: "502XXXX-21.2021.8.08.0025",
      nature: "Procedimento do juizado especial cível",
      judicialBranch: "Justiça dos Estados e do Distrito Federal e Territórios",
      initDate: new Date("2023-01-01"),
      amountInControversy: 5000,
      courtId: 1,
      involved: {
        perpetrator: "Nova pessoa",
        acused: "Novo banco",
        plaintifLawyerId: "OAB 6739/ES",
        defendantLawyerId: "OAB 7716/MG"
      },
      subjects: [
        "1"
      ]
    };

    await addLawsuit(addMock);

    expect(validateLawsuitInput.validateLawsuit).toHaveBeenCalled();
    expect(database.transaction).toHaveBeenCalled();
  })

  it("update lawsuit", async () => {
    const lawsuitId = "1";
    const updateMock = {
      amountInControversy: 10,
      judicialBranch: "",
      nature:""
    }
    jest.spyOn(Lawsuit, "update").mockResolvedValueOnce({} as any);

    await updateLawsuit(lawsuitId, updateMock);

    expect(Lawsuit.update).toHaveBeenCalledWith(
      updateMock,
      {
        where: {
          id: lawsuitId,
        },
      }
    );
  });

  it("remove lawsuit", async()=> {
    const lawsuitMock = {
      destroy: jest.fn()
    }
    const lawsuitId = "1";
    jest.spyOn(Lawsuit, "findOne").mockResolvedValueOnce(lawsuitMock as any);

    await removeLawsuit(lawsuitId);

    expect(Lawsuit.findOne).toHaveBeenCalledWith({
      where: {
        id: lawsuitId,
      },
    });
    expect(lawsuitMock.destroy).toHaveBeenCalled();
  });
});
