import { EnrolledEvent, EventType, EventTypeRu } from "../structs/Event";

export function splitEventsByCategories(
  events: EnrolledEvent[]
): Map<EventType, EnrolledEvent[]> {
  const eventsByCategory = new Map<EventType, EnrolledEvent[]>();

  events.forEach((event) => {
    const category = event.type;

    if (!eventsByCategory.get(category)) {
      eventsByCategory.set(category, []);
    }

    eventsByCategory.get(category)!.push(event);
  });

  return eventsByCategory;
}

export const eventTypesRu: EventTypeRu[] = [
  "Митапы",
  "Конференции",
  "Концерты",
  "Разное",
];

export const type2ru = new Map<EventType, EventTypeRu>([
  ["MEETUP", "Митапы"],
  ["CONFERENCE", "Конференции"],
  ["CONCERT", "Концерты"],
  ["OTHER", "Разное"],
]);

export const ru2type = new Map<EventTypeRu, EventType>([
  ["Митапы", "MEETUP"],
  ["Конференции", "CONFERENCE"],
  ["Концерты", "CONCERT"],
  ["Разное", "OTHER"],
]);
