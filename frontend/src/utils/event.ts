import { EnrolledEvent } from "../structs/Event";

interface EventsByCategory {
  [category: string]: EnrolledEvent[];
}

export function splitEventsByCategories(
  events: EnrolledEvent[]
): EventsByCategory {
  const eventsByCategory: EventsByCategory = {};

  events.forEach((event) => {
    const category = event.event.type;

    if (!eventsByCategory[category]) {
      eventsByCategory[category] = [];
    }

    eventsByCategory[category].push(event);
  });

  return eventsByCategory;
}

export const type2ru = new Map([
  ["MEETUP", "Митапы"],
  ["CONFERENCE", "Конференции"],
  ["CONCERT", "Концерты"],
  ["OTHER", "Разное"],
]);
