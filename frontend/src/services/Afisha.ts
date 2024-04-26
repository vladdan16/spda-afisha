// tags: [SERVICE, SERVICE_INTERFACE, SERVICE_IMPLs]

import axios, { AxiosError, AxiosInstance } from "axios";
import {
  IEvent,
  IEventData,
  IEventWithUsers,
  IIdEventData,
} from "../structs/Event";
import { delay } from "../utils/async";
import { NotOnboarded } from "../exceptions/afisha";
import { IUser } from "../structs/IUser";

export interface IAfisha {
  getEventsList(): Promise<IEvent[]>;
  createEvent(accessToken: string, event: IEventData): Promise<{ id: number }>;
  editEvent(accessToken: string, event: IIdEventData): Promise<void>;
  deleteEvent(accessToken: string, eventId: number): Promise<void>;
  getMyEvents(accessToken: string): Promise<IEventWithUsers[]>;
  getMyEnrollments(accessToken: string): Promise<IEvent[]>;
  onboard(accessToken: string, name: string, surname: string): Promise<void>;
  enroll(accessToken: string, eventId: number): Promise<void>;
  unenroll(accessToken: string, eventId: number): Promise<void>;
}

interface IEventModel {
  id: number;
  name: string;
  description: string;
  start_at: Date | string;
  type: "MEETUP" | "CONFERENCE" | "CONCERT" | "OTHER";
  available_seats: number;
  number_seats: number;
  place: string | null;
  images: string[];
}

interface IEventWithUsersModel extends IEventModel {
  enrolled_users: IUser[];
}

export class RestAfisha implements IAfisha {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });
  }

  static convertEventDates<T extends IEventModel>(events: T[]) {
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
      const response = await this.axiosInstance.get<{ events: IEventModel[] }>(
        "/event/list"
      );
      return RestAfisha.convertEventDates(response.data.events);
    });
  }

  deleteEvent(accessToken: string, eventId: number): Promise<void> {
    return RestAfisha.convertErrors(async () => {
      await this.axiosInstance.delete("/event/" + eventId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });
  }

  createEvent(accessToken: string, event: IEventData): Promise<{ id: number }> {
    return RestAfisha.convertErrors(async () => {
      const response = await this.axiosInstance.post<number>("/event", event, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return { id: response.data };
    });
  }

  editEvent(accessToken: string, event: IIdEventData): Promise<void> {
    return RestAfisha.convertErrors(async () => {
      await this.axiosInstance.patch("/event", event, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });
  }

  getMyEvents(accessToken: string): Promise<IEventWithUsers[]> {
    return RestAfisha.convertErrors(async () => {
      const response = await this.axiosInstance.get<{
        events: IEventWithUsersModel[];
      }>("/event/my_events", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return RestAfisha.convertEventDates(response.data.events);
    });
  }

  getMyEnrollments(accessToken: string): Promise<IEvent[]> {
    return RestAfisha.convertErrors(async () => {
      const response = await this.axiosInstance.get<{ enrolls: IEventModel[] }>(
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
        available_seats: 10,
        number_seats: 15,
        place: "Технопарк, ауд. 122",
        images: [],
      },
      {
        id: 2,
        name: "Event 2 Name",
        description: "Event Description",
        start_at: new Date(),
        type: "MEETUP",
        available_seats: 10,
        number_seats: 15,
        place: "Технопарк, ауд. 122",
        images: [],
      },
      {
        id: 3,
        name: "Event 3 Name",
        description: "Event Description",
        start_at: new Date(),
        type: "CONFERENCE",
        available_seats: 10,
        number_seats: 15,
        place: "Технопарк, ауд. 122",
        images: [],
      },
    ]);
  }

  async onboard(): Promise<void> {}

  async deleteEvent(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async createEvent(): Promise<{ id: number }> {
    await delay([], 1000);
    throw new Error("Method not implemented.");
  }

  editEvent(accessToken: string, event: IIdEventData): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async getMyEvents(): Promise<IEventWithUsers[]> {
    return await delay([]);
  }

  async getMyEnrollments(): Promise<IEvent[]> {
    return await this.getEventsList();
  }

  async enroll(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async unenroll(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
