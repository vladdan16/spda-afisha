package com.vladdan16.spda_afisha.backend.domain.exceptions;

public class EventNotFoundException extends RuntimeException {
  public EventNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }
}
