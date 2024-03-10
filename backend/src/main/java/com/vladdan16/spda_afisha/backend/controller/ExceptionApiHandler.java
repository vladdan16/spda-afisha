package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.domain.exceptions.EventNotFoundException;
import com.vladdan16.spda_afisha.backend.dto.responses.ApiErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.List;

@RestControllerAdvice
public class ExceptionApiHandler {
  @ExceptionHandler(EventNotFoundException.class)
  public ResponseEntity<ApiErrorResponse> handleEventNotFoundException(final EventNotFoundException e) {
    List<String> errors = List.of(Arrays.toString(e.getStackTrace()));
    ApiErrorResponse response = new ApiErrorResponse("Event not found", "404",
        e.getClass().getSimpleName(), e.getMessage(), errors);
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  // TODO: handle other possible exceptions

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleException(final Exception e) {
    List<String> errors = List.of(Arrays.toString(e.getStackTrace()));
    ApiErrorResponse response = new ApiErrorResponse("Internal Server Error", "500",
        e.getClass().getSimpleName(), e.getMessage(), errors);
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }
}
