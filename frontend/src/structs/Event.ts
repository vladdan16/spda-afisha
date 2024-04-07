export interface IEvent {
  id: number;
  name: string;
  description: string;
  startAt: Date;
  numberSeats: number;
  type: "MEETUP" | "CONFERENCE" | "CONCERT" | "OTHER";
}

export class EnrolledEvent {
  event: IEvent;
  isEnrolled: boolean;

  constructor({ event, isEnrolled }: { event: IEvent; isEnrolled: boolean }) {
    this.event = event;
    this.isEnrolled = isEnrolled;
  }
}
