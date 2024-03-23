package com.vladdan16.spda_afisha.backend.domain.exceptions;

public class NotAuthorizedException extends RuntimeException {
  public NotAuthorizedException(String message, Throwable cause) {
    super(message, cause);
  }
}
