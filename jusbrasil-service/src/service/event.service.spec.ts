import Event from "@models/lawsuit_event.model";
import EventService from "@services/event.service";

jest.mock("../database/models/lawsuit_event.model", () => ({
  init: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
}));

describe("Event Service", () => {
  it("Create Event", async () => {
    const mock = {
      lawsuitId: "1",
      date: "10/10/2022"
    };
    jest.spyOn(Event, "create").mockResolvedValueOnce({
      get: jest.fn(() => ({ id: 1 }))
    });

    await EventService.createEvent(mock);

    expect(Event.create).toHaveBeenCalledWith({
      lawsuit_id: mock.lawsuitId,
      date: mock.date
    });
  });

  it("Return event id", async () => {
    jest.spyOn(Event, "findOne").mockResolvedValueOnce(null);
    const mock = {
      lawsuitId: "1",
      date: "10/10/2022",
    };
    await EventService.retrieveEventId(mock);

    expect(Event.findOne).toHaveBeenCalledWith({
      where: {
        lawsuit_id: mock.lawsuitId,
        date: mock.date,
      },
      raw: true
    });
  });
});
