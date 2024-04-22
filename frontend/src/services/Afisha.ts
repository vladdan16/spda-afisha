// tags: [SERVICE, SERVICE_INTERFACE, SERVICE_IMPLs]

import axios, { AxiosInstance } from "axios";
import { IEvent, IRawEvent } from "../structs/Event";
import { configFromAccessToken } from "../utils/rest";
import { delay } from "../utils/async";

export interface IAfisha {
  getEventsList(): Promise<IEvent[]>;
  getMyEnrollments(accessToken: string): Promise<IEvent[]>;
  enroll(accessToken: string, eventId: number): Promise<void>;
  unenroll(accessToken: string, eventId: number): Promise<void>;
}

export class RestAfisha implements IAfisha {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });
  }

  private convertEventDates(events: IRawEvent[]): IEvent[] {
    return events.map((event) => ({
      ...event,
      start_at: new Date(event.start_at), // Convert string to Date object
    }));
  }

  async getEventsList(): Promise<IEvent[]> {
    const response = await this.axiosInstance.get<{ events: IRawEvent[] }>(
      "/event/list"
    );
    return this.convertEventDates(response.data.events);
  }

  async getMyEnrollments(accessToken: string): Promise<IEvent[]> {
    const response = await this.axiosInstance.get<{ events: IRawEvent[] }>(
      "/event/my_events",
      configFromAccessToken(accessToken)
    );
    return this.convertEventDates(response.data.events);
  }

  async enroll(accessToken: string, eventId: number): Promise<void> {
    await this.axiosInstance.post(
      "/enroll",
      {
        event_id: eventId,
      },
      configFromAccessToken(accessToken)
    );
  }

  async unenroll(accessToken: string, eventId: number): Promise<void> {
    await this.axiosInstance.delete(
      "/enroll",
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

  async getMyEnrollments(): Promise<IEvent[]> {
    return [];
  }

  async enroll(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async unenroll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
