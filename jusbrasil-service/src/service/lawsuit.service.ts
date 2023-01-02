import Involved from "@models/involved.model";
import Lawsuit from "@models/lawsuit.model";
import Court from "@models/court.model";
import Lawyer from "@models/lawyer.model";
import LawsuitSubject from "@models/lawsuit_subject.model";
import Subject from "@models/subject.model";
import LawsuitEvent from "@models/lawsuit_event.model";
import EventDocument from "@models/event_document.model";

interface document {
  label: string,
  description: string,
  created_at: string
}

async function findAllLawsuits() {
  return (
    await Lawsuit.findAll({
      include: [
        {
          model: Involved,
          attributes: ["acused"],
        },
      ],
      raw: true
    })
  )
}

async function findOneLawsuit(id: string) {
  const lawsuit = await Lawsuit.findOne({
    where: { id },
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
  });

  const subjects = await LawsuitSubject.findAll({
    where: {
      lawsuit_id: id,
    },
    include: [
      {
        model: Subject,
      },
    ],
    raw: true,
    nest: true,
  });

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
        date: string,
        documents: document[],
      }[],
      item
    ) => {
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

export { findAllLawsuits, findOneLawsuit };
