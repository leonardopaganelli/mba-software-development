import EventService from "@services/event.service";
import Document from "@models/event_document.model";

async function addDocument(document: {
  lawsuitId: string;
  date: string,
  status: string,
  description: string,
}) {
  const {
    lawsuitId,
    date,
    status,
    description,
  } = document;

  let eventId = await EventService.retrieveEventId({ lawsuitId, date });
  if (!eventId) {
    eventId = await EventService.createEvent({ lawsuitId, date });
    console.log(`Event ${eventId} - ${date} created`);
  }

  await Document.create({
    event_id: eventId as string,
    label: status,
    description,
    created_at: new Date().toISOString().slice(0, 10),
  });
}

export { addDocument };
