// tags: [SERVICE, SERVICE_INTERFACE, SERVICE_IMPL]

import { IEvent } from "../structs/Event";
import { IAfisha } from "./Afisha";
import { ensureToken } from "./Authenticator";

export interface IPersonalAfisha {
  getMyEnrollments(): Promise<IEvent[]>;
  enroll(eventId: number): Promise<void>;
  unenroll(eventId: number): Promise<void>;
}

// NOTE: it uses global singleton Authenticator
export class FirebaseAuthPersonalAfisha implements IPersonalAfisha {
  private backend: IAfisha;

  constructor(backend: IAfisha) {
    this.backend = backend;
  }

  async getMyEnrollments(): Promise<IEvent[]> {
    const token = await ensureToken();
    return await this.backend.getMyEnrollments(token);
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
