// tags: [SERVICE, SERVICE_INTERFACE, SERVICE_IMPL]

import {
  IEvent,
  IEventData,
  IEventWithUsers,
  IIdEventData,
} from "../structs/Event";
import { IAfisha } from "./Afisha";
import { ensureToken } from "./Authenticator";

export interface IPersonalAfisha {
  onboard(name: string, surname: string): Promise<void>;
  getMyEnrollments(): Promise<IEvent[]>;
  createEvent(event: IEventData): Promise<{ id: number }>;
  editEvent(event: IIdEventData): Promise<void>;
  deleteEvent(eventId: number): Promise<void>;
  getMyEvents(): Promise<IEventWithUsers[]>;
  enroll(eventId: number): Promise<void>;
  unenroll(eventId: number): Promise<void>;
}

// NOTE: it uses global singleton Authenticator
export class FirebaseAuthPersonalAfisha implements IPersonalAfisha {
  private backend: IAfisha;

  constructor(backend: IAfisha) {
    this.backend = backend;
  }

  async onboard(name: string, surname: string): Promise<void> {
    const token = await ensureToken();
    return await this.backend.onboard(token, name, surname);
  }

  async getMyEnrollments(): Promise<IEvent[]> {
    const token = await ensureToken();
    return await this.backend.getMyEnrollments(token);
  }

  async createEvent(event: IEventData): Promise<{ id: number }> {
    const token = await ensureToken();
    return await this.backend.createEvent(token, event);
  }

  async editEvent(event: IIdEventData): Promise<void> {
    const token = await ensureToken();
    return await this.backend.editEvent(token, event);
  }

  async deleteEvent(eventId: number): Promise<void> {
    const token = await ensureToken();
    return await this.backend.deleteEvent(token, eventId);
  }

  async getMyEvents(): Promise<IEventWithUsers[]> {
    const token = await ensureToken();
    return await this.backend.getMyEvents(token);
  }

  async enroll(eventId: number): Promise<void> {
    const token = await ensureToken();
    return await this.backend.enroll(token, eventId);
  }

  async unenroll(eventId: number): Promise<void> {
    const token = await ensureToken();
    return await this.backend.unenroll(token, eventId);
  }
}
