import axios from "axios";
import { IEvent } from "../structs/Event";
import { configFromAccessToken } from "../utils/rest";
import { delay } from "../utils/async";

export interface IAfisha {
  getEventsList(): Promise<IEvent[]>;
  getMyEnrollments(accessToken: string): Promise<IEvent[]>;
  enroll(accessToken: string, eventId: number): Promise<void>;
  unenroll(accessToken: string, eventId: number): Promise<void>;
}

export class RestAfisha implements IAfisha {
  readonly prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  async getEventsList() {
    // TODO: remove this crunch
    const accessToken =
      "eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkOWI0ZTY5ZTMyYjc2MTVkNGNkN2NhZmI4ZmM5YjNmODFhNDFhYzAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3BkYS1hZmlzaGEiLCJhdWQiOiJzcGRhLWFmaXNoYSIsImF1dGhfdGltZSI6MTcxMzcyNTQxOCwidXNlcl9pZCI6ImsybUVNOFFySWpUOE1HY3pqVXg0Y1pxS1VSSjIiLCJzdWIiOiJrMm1FTThRcklqVDhNR2N6alV4NGNacUtVUkoyIiwiaWF0IjoxNzEzNzI1NDE4LCJleHAiOjE3MTM3MjkwMTgsImVtYWlsIjoibmFidWtpQHZrLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJuYWJ1a2lAdmsuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.X0legEc73OXMwaWLjGH9Ci-719vOUW6z0sExTwYzCdQsDSnkfdI0AcyDCYjmqmboW-yLl_kBYJ1PeWEmqrEcegsRKJE2Xi_2im2EfiduXv9MmHPGojTz-fYDEmZlQZ1__lueGlriJdCXINOYdHgWPPsTrRF2LlJk5GEoizYaBzgs_wuvNelXdT7e9Vd5JpSZrTXB915NPajJELvi2--vxWqT9LJrCJ5XUU8NuoytLdY8pOFQT4YuFluBwvLAB28Oh3lSpgMFshN1tOc8btUUiryVY7DhR4J5rYQ76H4gmHvbi9zPbhaH0131eczUY_GDVsjInahGiw6lwNDDsSOMkA";
    return (
      await axios.get<{ events: IEvent[] }>(
        this.prefix + "/event/list",
        configFromAccessToken(accessToken)
      )
    ).data.events;
  }

  async getMyEnrollments(accessToken: string) {
    return (
      await axios.get<{ events: IEvent[] }>(
        this.prefix + "/event/my_events",
        configFromAccessToken(accessToken)
      )
    ).data.events;
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
  async getEventsList() {
    return await delay<IEvent[]>([
      {
        id: 1,
        name: "Event 1 Name",
        description: "Event Description",
        start_at: new Date(),
        type: "MEETUP",
      },
      {
        id: 2,
        name: "Event 2 Name",
        description: "Event Description",
        start_at: new Date(),
        type: "MEETUP",
      },
      {
        id: 3,
        name: "Event 3 Name",
        description: "Event Description",
        start_at: new Date(),
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
