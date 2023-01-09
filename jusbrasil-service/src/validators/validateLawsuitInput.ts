import Lawsuit from "@models/lawsuit.model";
import { findOneCourt } from "@services/court.service";
import { verifyLawyersExistence } from "@services/lawyer.service";
import { verifySubjectExistence } from "@services/subject.service";

interface lawsuitCreateInput {
  id: string;
  nature: string;
  judicialBranch: string;
  initDate: Date;
  amountInControversy: number;
  courtId: number;
  involved: {
    perpetrator: string;
    acused: string;
    plaintifLawyerId: string;
    defendantLawyerId: string;
  };
  subjects: string[];
}

async function validateLawsuit(lawsuitToInsert: lawsuitCreateInput) {
  if ((await Lawsuit.count({ where: { id: lawsuitToInsert.id } })) !== 0)
    throw new Error(`Lawsuit ${lawsuitToInsert.id} already exists`);

  if (await !(await findOneCourt(lawsuitToInsert.courtId)))
    throw new Error(`Court ${lawsuitToInsert.courtId} does not exist`);

  const lawyerIds = [
    lawsuitToInsert.involved.plaintifLawyerId,
    lawsuitToInsert.involved.defendantLawyerId,
  ];

  if (await !verifyLawyersExistence(lawyerIds))
    throw new Error(`Lawyers ${lawyerIds.toString()} does not exist`);

  if (await !verifySubjectExistence(lawsuitToInsert.subjects))
    throw new Error(
      `Subjects ${lawsuitToInsert.subjects.toString()} does not exist`
    );
}

export default { validateLawsuit };
