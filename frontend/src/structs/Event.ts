export type EventType = "MEETUP" | "CONFERENCE" | "CONCERT" | "OTHER";
export type EventTypeRu = "Митапы" | "Конференции" | "Концерты" | "Разное";

export interface IEventData {
  name: string;
  description: string;
  start_at: Date;
  type: EventType;
  number_seats: number;
  place: string | null;
}

export interface IIdEventData extends IEventData {
  id: number;
}

export interface IEvent extends IIdEventData {
  available_seats: number;
  images: string[];
}

export class EnrolledEvent implements IEvent {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  type: EventType;
  available_seats: number;
  number_seats: number;
  place: string | null;
  images: string[];

  isEnrolled: boolean;

  constructor({ event, isEnrolled }: { event: IEvent; isEnrolled: boolean }) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.start_at = event.start_at;
    this.type = event.type;
    this.available_seats = event.available_seats;
    this.number_seats = event.number_seats;
    this.place = event.place;
    this.images = event.images;
    this.isEnrolled = isEnrolled;
  }
}
