import Subject from "@models/subject.model";
import { verifySubjectExistence } from "@services/subject.service";

jest.mock("../database/models/subject.model", () => ({
  init: jest.fn(),
  count: jest.fn(),
}));

describe("Verify subject Event", () => {
  it("Should throw error with 0 subjects", async () => {
    const emptyArray = [] as string[];
    verifySubjectExistence(emptyArray);

    expect(verifySubjectExistence).rejects;
  });

  it("Should return false if any subject isnt in datbase", async () => {
    const mock = ["1"];
    jest.spyOn(Subject, "count").mockResolvedValueOnce(0);

    const result = await verifySubjectExistence(mock);

    expect(result).toBeFalsy();
  });

  it("Should return true if all subjects exists in datbase", async () => {
    const mock = ["1"];
    jest.spyOn(Subject, "count").mockResolvedValueOnce(1);

    const result = await verifySubjectExistence(mock);

    expect(result).toBeTruthy();
  });
});
