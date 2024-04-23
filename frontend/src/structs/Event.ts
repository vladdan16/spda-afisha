export interface IRawEvent {
  id: number;
  name: string;
  description: string;
  start_at: Date | string;
  type: "MEETUP" | "CONFERENCE" | "CONCERT" | "OTHER";
  available_seats: number;
  number_seats: number;
}

export interface IEvent {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  type: "MEETUP" | "CONFERENCE" | "CONCERT" | "OTHER";
  available_seats: number;
  number_seats: number;
  // place: string;
  // images: string[];
}

export class EnrolledEvent implements IEvent {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  type: "MEETUP" | "CONFERENCE" | "CONCERT" | "OTHER";
  available_seats: number;
  number_seats: number;

  isEnrolled: boolean;

  constructor({ event, isEnrolled }: { event: IEvent; isEnrolled: boolean }) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.start_at = event.start_at;
    this.type = event.type;
    this.available_seats = event.available_seats;
    this.number_seats = event.number_seats;
    this.isEnrolled = isEnrolled;
  }
}
