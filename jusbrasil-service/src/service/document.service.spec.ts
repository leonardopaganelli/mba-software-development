import Document from "@models/event_document.model";
import { addDocument } from "@services/document.service";
import EventService from "@services/event.service";

jest.mock("../database/models/event_document.model", () => ({
  init: jest.fn(),
  create: jest.fn(),
}));

jest.mock("../service/event.service", () => ({
    createEvent: jest.fn(),
    retrieveEventId: jest.fn()
}));

describe("Document Service", () => {
  describe("Add Document", () => {
      it("With existing event", async () => {
        const mock = {
          lawsuitId: "1",
          date: "10/10/2022",
          status: "A",
          description: "B"
        };

        jest.spyOn(EventService, "retrieveEventId").mockResolvedValueOnce("1");
        await addDocument(mock);

        expect(EventService.retrieveEventId).toHaveBeenCalledWith({
            lawsuitId: mock.lawsuitId,
            date: mock.date
        })
        expect(EventService.createEvent).not.toHaveBeenCalled();
        expect(Document.create).toHaveBeenCalledWith({
          event_id: "1",
          label: mock.status,
          description: mock.description,
          created_at: new Date().toISOString().slice(0, 10),
        });
      });
      it("With no existing event", async () => {
        const mock = {
          lawsuitId: "1",
          date: "10/10/2022",
          status: "A",
          description: "B",
        };

        jest.spyOn(EventService, "retrieveEventId").mockResolvedValueOnce(null);
        jest.spyOn(EventService, "createEvent").mockResolvedValueOnce("1");

        await addDocument(mock);

        expect(EventService.retrieveEventId).toHaveBeenCalledWith({
          lawsuitId: mock.lawsuitId,
          date: mock.date,
        });
        expect(EventService.createEvent).toHaveBeenCalledWith({
            lawsuitId: mock.lawsuitId,
            date: mock.date
        });
        expect(Document.create).toHaveBeenCalledWith({
          event_id: "1",
          label: mock.status,
          description: mock.description,
          created_at: new Date().toISOString().slice(0, 10),
        });
      });
  })

});
