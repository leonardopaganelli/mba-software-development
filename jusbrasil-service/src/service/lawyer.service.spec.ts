import Lawyer from "@models/lawyer.model";
import { verifyLawyersExistence } from "@services/lawyer.service";

jest.mock("../database/models/lawyer.model", () => ({
  init: jest.fn(),
  count: jest.fn(),
}));

describe("Verify Lawyer existance", () => {
  it("Should throw error with any value different 2", async () => {
    const emptyArray = [] as string[];
    verifyLawyersExistence(emptyArray);

    expect(verifyLawyersExistence).rejects;
  });

  it("Should return false if all lawyers isn't in database", async () => {
    const mock = ["1", "2"];
    jest.spyOn(Lawyer, "count").mockResolvedValueOnce(0);

    const result = await verifyLawyersExistence(mock);

    expect(result).toBeFalsy();
  });

  it("Should return true if all lawyers exists in database", async () => {
    const mock = ["1", "2"];
    jest.spyOn(Lawyer, "count").mockResolvedValueOnce(2);

    const result = await verifyLawyersExistence(mock);

    expect(result).toBeTruthy();
  });
});
