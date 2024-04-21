export interface IEvent {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  type: "MEETUP" | "CONFERENCE" | "CONCERT" | "OTHER";
  // place: string;
  // available_seats: number;
  // number_seats: number;
  // images: string[];
}

export class EnrolledEvent implements IEvent {
  id: number;
  name: string;
  description: string;
  start_at: Date;
  type: "MEETUP" | "CONFERENCE" | "CONCERT" | "OTHER";

  isEnrolled: boolean;

  constructor({ event, isEnrolled }: { event: IEvent; isEnrolled: boolean }) {
    this.id = event.id;
    this.name = event.name;
    this.description = event.description;
    this.start_at = event.start_at;
    this.type = event.type;
    this.isEnrolled = isEnrolled;
  }
}
