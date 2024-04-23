// tags: [SERVICE, SERVICE_INTERFACE, SERVICE_IMPLs]

import axios, { AxiosError, AxiosInstance } from "axios";
import { IEvent, IRawEvent } from "../structs/Event";
import { delay } from "../utils/async";
import { NotOnboarded } from "../exceptions/afisha";

export interface IAfisha {
  getEventsList(): Promise<IEvent[]>;
  getMyEvents(accessToken: string): Promise<IEvent[]>;
  getMyEnrollments(accessToken: string): Promise<IEvent[]>;
  onboard(accessToken: string, name: string, surname: string): Promise<void>;
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

  static convertEventDates(events: IRawEvent[]): IEvent[] {
    return events.map((event) => ({
      ...event,
      start_at: new Date(event.start_at), // Convert string to Date object
    }));
  }

  static async convertErrors<T>(func: () => Promise<T>): Promise<T> {
    try {
      return await func();
    } catch (err: any) {
      if (
        err instanceof AxiosError &&
        err.response?.data.exceptionMessage === "User not found"
      ) {
        throw new NotOnboarded();
      }
      throw err;
    }
  }

  onboard(accessToken: string, name: string, surname: string): Promise<void> {
    return RestAfisha.convertErrors(async () => {
      await this.axiosInstance.post(
        "/user",
        {
          name,
          surname,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    });
  }

  getEventsList(): Promise<IEvent[]> {
    return RestAfisha.convertErrors(async () => {
      const response = await this.axiosInstance.get<{ events: IRawEvent[] }>(
        "/event/list"
      );
      return RestAfisha.convertEventDates(response.data.events);
    });
  }

  getMyEvents(accessToken: string): Promise<IEvent[]> {
    return RestAfisha.convertErrors(async () => {
      const response = await this.axiosInstance.get<{ events: IRawEvent[] }>(
        "/event/my_events",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return RestAfisha.convertEventDates(response.data.events);
    });
  }

  getMyEnrollments(accessToken: string): Promise<IEvent[]> {
    return RestAfisha.convertErrors(async () => {
      const response = await this.axiosInstance.get<{ enrolls: IRawEvent[] }>(
        "/enroll/my_enrolls",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return RestAfisha.convertEventDates(response.data.enrolls);
    });
  }

  enroll(accessToken: string, eventId: number): Promise<void> {
    return RestAfisha.convertErrors(async () => {
      await this.axiosInstance.post(
        "/enroll",
        {},
        {
          params: { eventId },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    });
  }

  unenroll(accessToken: string, eventId: number): Promise<void> {
    return RestAfisha.convertErrors(async () => {
      await this.axiosInstance.delete("/enroll", {
        params: { eventId },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });
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

  async onboard(): Promise<void> {}

  async getMyEvents(): Promise<IEvent[]> {
    return [];
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
