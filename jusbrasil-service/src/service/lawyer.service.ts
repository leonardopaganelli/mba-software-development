import Lawyer from "@models/lawyer.model";

async function verifyLawyersExistence(
  lawyerIds: string[]
) {
  if (lawyerIds.length !== 2) throw new Error("verifyLawyersExistence only accepts two id's");

  const lawyersInDatabase = await Lawyer.count({
    where: {
      id: {
        in: lawyerIds,
      },
    },
  });

  return lawyersInDatabase === lawyerIds.length;
}

export { verifyLawyersExistence };
