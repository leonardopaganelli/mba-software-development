import Event from "@models/lawsuit_event.model";

async function createEvent({
  lawsuitId,
  date,
}: {
  lawsuitId: string;
  date: string;
}): Promise<string> {
  const { id } = (
    await Event.create({
      lawsuit_id: lawsuitId,
      date,
    })
  ).get({ plain: true });

  return id;
}

async function retrieveEventId({
  lawsuitId,
  date,
}: {
  lawsuitId: string;
  date: string;
}) {
  const event = await Event.findOne({
    where: {
      lawsuit_id: lawsuitId,
      date,
    },
    raw: true,
  });

  return event?.id || null;
}

export default { createEvent, retrieveEventId };