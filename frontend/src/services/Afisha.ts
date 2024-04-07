import axios from "axios";
import { IEvent } from "../structs/Event";
import { configFromAccessToken } from "../utils/rest";
import { delay } from "../utils/async";

export interface IAfisha {
  getEventsList(accessToken: string): Promise<IEvent[]>;
  getMyEnrollments(accessToken: string): Promise<IEvent[]>;
  enroll(accessToken: string, eventId: number): Promise<void>;
  unenroll(accessToken: string, eventId: number): Promise<void>;
}

export class RestAfisha implements IAfisha {
  readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  async getEventsList(accessToken: string) {
    return (
      await axios.get<IEvent[]>(
        this.prefix + "/event/list",
        configFromAccessToken(accessToken)
      )
    ).data;
  }

  async getMyEnrollments(accessToken: string) {
    return (
      await axios.get<IEvent[]>(
        this.prefix + "/event/list",
        configFromAccessToken(accessToken)
      )
    ).data;
  }

  async enroll(accessToken: string, eventId: number) {
    await axios.post(
      this.prefix + "/enroll",
      {
        event_id: eventId,
      },
      configFromAccessToken(accessToken)
    );
  }

  async unenroll(accessToken: string, eventId: number) {
    await axios.delete(
      this.prefix + "/enroll",
      configFromAccessToken(accessToken, { id: eventId })
    );
  }
}

export class MockAfisha implements IAfisha {
  async getEventsList(accessToken: string) {
    return await delay<IEvent[]>([
      {
        id: 1,
        name: "Event 1 Name",
        description: "Event Description",
        startAt: new Date(),
        numberSeats: 100,
        type: "MEETUP",
      },
      {
        id: 2,
        name: "Event 2 Name",
        description: "Event Description",
        startAt: new Date(),
        numberSeats: 100,
        type: "MEETUP",
      },
      {
        id: 3,
        name: "Event 3 Name",
        description: "Event Description",
        startAt: new Date(),
        numberSeats: 100,
        type: "CONFERENCE",
      },
    ]);
  }

  async getMyEnrollments(accessToken: string): Promise<IEvent[]> {
    return [];
  }

  async enroll(accessToken: string, eventId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async unenroll(accessToken: string, eventId: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
