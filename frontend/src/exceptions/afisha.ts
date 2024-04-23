export class AfishaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotOnboarded extends AfishaError {
  constructor() {
    super("Not onboarded");
    this.name = this.constructor.name;
  }
}
