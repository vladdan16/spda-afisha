export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class CannotObtainAccessToken extends AuthenticationError {
  constructor() {
    super("Cannot obtain access token");
    this.name = this.constructor.name;
  }
}
