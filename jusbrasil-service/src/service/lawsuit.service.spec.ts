import Involved from "@models/involved.model";
import Lawsuit from "@models/lawsuit.model";
import Court from "@models/court.model";
import Lawyer from "@models/lawyer.model";
import Subject from "@models/subject.model";
import EventDocument from "@models/event_document.model";

import { findAllLawsuits, findOneLawsuit } from "@services/lawsuit.service";
import LawsuitSubject from "@models/lawsuit_subject.model";
import LawsuitEvent from "@models/lawsuit_event.model";

jest.mock("../database/models/lawsuit.model", () => ({
  init: jest.fn(),
  findOne: jest.fn(),
  findAll: jest.fn(),
}));
jest.mock("../database/models/involved.model", () => ({
  init: jest.fn(),
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
  findAll: jest.fn()
}));

describe("Lawsuit Service", () => {
  it("return all lawusuits", async () => {
    jest.spyOn(Lawsuit, "findAll").mockResolvedValueOnce([]);

    await findAllLawsuits();
    expect(Lawsuit.findAll).toHaveBeenCalledWith({
      include: [
        {
          model: Involved,
          attributes: ["acused"],
        },
      ],
      raw: true
    });
  });

  it("return specific lawsuit", async () => {
    jest.spyOn(Lawsuit, "findOne").mockResolvedValueOnce(null);
    jest.spyOn(LawsuitSubject, "findAll").mockResolvedValueOnce([]);
    jest.spyOn(LawsuitEvent, "findAll").mockResolvedValueOnce([
      {
        date: "12-12-2022",
        document: {
          label: "label",
          description: "description",
          created_at: "12-12-2022",
        },
      },
      {
        date: "12-12-2022",
        document: {
          label: "label 2",
          description: "description 2",
          created_at: "12-12-2022",
        },
      },
    ] as any[]);

    const mockId = "1";

    const lawsuitSubjectParameters = {
      where: {
        lawsuit_id: mockId,
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
      include: [
        {
          model: Court,
        },
        {
          model: Involved,
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
});
