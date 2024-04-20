package com.vladdan16.spda_afisha.backend.domain.exceptions;

public class BadRequestException extends RuntimeException {
  public BadRequestException(String message) {
    super(message);
  }
}
