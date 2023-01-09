import Subject from "@models/subject.model";

async function verifySubjectExistence(subjectIds: string[]) {
  if (!subjectIds.length) {
    throw new Error("verifySubjectExistence only accepts one or more subjects");
  }

  const subjectsInDatabase = await Subject.count({
    where: {
      id: {
        in: subjectIds,
      },
    },
  });

  return subjectsInDatabase === subjectIds.length;
}

export { verifySubjectExistence };
