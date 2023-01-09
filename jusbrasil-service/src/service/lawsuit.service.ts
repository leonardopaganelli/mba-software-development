import Involved from "@models/involved.model";
import Lawsuit from "@models/lawsuit.model";
import Court from "@models/court.model";
import Lawyer from "@models/lawyer.model";
import LawsuitSubject from "@models/lawsuit_subject.model";
import Subject from "@models/subject.model";
import LawsuitEvent from "@models/lawsuit_event.model";
import EventDocument from "@models/event_document.model";
import { database } from "@clients/database";
import validateLawsuitInput from "@validators/validateLawsuitInput";

interface document {
  event_id: string,
  label: string,
  description: string,
  created_at: string
}

interface lawsuitUpdateInput {
  nature: string;
  judicialBranch: string;
  amountInControversy: number;
}

interface lawsuitCreateInput {
  id: string,
  nature: string,
  judicialBranch: string,
  initDate: Date,
  amountInControversy: number,
  courtId: number,
  involved: {
    perpetrator: string,
    acused: string,
    plaintifLawyerId: string,
    defendantLawyerId: string
  },
  subjects: string[]
}

async function findAllLawsuits() {
  return (
    await Lawsuit.findAll({
      attributes: {
        exclude: ["court_id"]
      },
      include: [
        {
          model: Involved,
          attributes: ["acused"],
        },
      ],
      raw: true
    })
  );
}

async function findOneLawsuit(id: string) {
  const lawsuit = await Lawsuit.findOne({
    where: { id },
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
  });

  if(!lawsuit) return null;

  const subjects = (
    await LawsuitSubject.findAll({
      where: {
        lawsuit_id: id,
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
    })
  ).map((item) => item.Subject);

  const events = (
    await LawsuitEvent.findAll({
      attributes: ["date"],
      where: {
        lawsuit_id: id,
      },
      include: [
        {
          model: EventDocument,
        },
      ],
      raw: true,
      nest: true,
    })
  ).reduce(
    (
      map: {
        date: string;
        documents: document[];
      }[],
      item
    ) => {
      if (!item.EventDocuments.event_id) return map;

      const dateIndex = (map || []).findIndex(
        (current) => current.date === item.date
      );

      if (dateIndex === -1) {
        map.push({
          date: item.date,
          documents: [item.EventDocuments],
        });
      } else {
        map[dateIndex].documents.push(item.EventDocuments);
      }

      return map;
    },
    []
  );

  return {
    ...lawsuit,
    subjects,
    events,
  };
}

async function addLawsuit(lawsuitToInsert: lawsuitCreateInput) {
  await validateLawsuitInput.validateLawsuit(lawsuitToInsert);

  await database.transaction(async(transaction) => {
    const {
      id,
      nature,
      judicialBranch,
      initDate,
      amountInControversy,
      courtId,
      involved: {
        perpetrator,
        acused,
        defendantLawyerId,
        plaintifLawyerId
      },
      subjects
    } = lawsuitToInsert;
    console.log("creatomg lawsuit");
    await Lawsuit.create({
      id,
      nature,
      judicialBranch,
      initDate,
      amountInControversy,
      courtId
    }, { transaction });

    await Involved.create({
      lawsuit_id: id,
      perpetrator,
      acused,
      plaintif_lawyer_id: plaintifLawyerId,
      defendant_lawyer_id: defendantLawyerId
    }, {transaction});

    for await (const subject of subjects) {
      await LawsuitSubject.create({
        lawsuit_id: id,
        subject_id: subject,
      }, { transaction });
    }
  });
}

async function removeLawsuit(lawsuitId: string) {
  const lawsuit = await Lawsuit.findOne({
    where: {
      id: lawsuitId
    }
  });
  await lawsuit?.destroy();
}

async function updateLawsuit(
  lawsuitId: string,
  {
    amountInControversy,
    judicialBranch,
    nature
  }: lawsuitUpdateInput) {
  await Lawsuit.update({
    amountInControversy,
    judicialBranch,
    nature
  }, {
    where: {
      id: lawsuitId
    }
  });
}

export {
  findAllLawsuits,
  findOneLawsuit,
  addLawsuit,
  updateLawsuit,
  removeLawsuit,
};
