package com.vladdan16.spda_afisha.backend.domain.exceptions;

public class NotAcceptableException extends RuntimeException {
  public NotAcceptableException(String message, Throwable cause) {
    super(message, cause);
  }
}
