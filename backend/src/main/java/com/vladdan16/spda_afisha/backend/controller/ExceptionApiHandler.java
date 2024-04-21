package com.vladdan16.spda_afisha.backend.controller;

import com.github.loki4j.slf4j.marker.LabelMarker;
import com.vladdan16.spda_afisha.backend.domain.exceptions.*;
import com.vladdan16.spda_afisha.backend.dto.responses.ApiErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestControllerAdvice
public class ExceptionApiHandler {
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<ApiErrorResponse> handleNotFoundException(final NotFoundException e) {
    LabelMarker marker = LabelMarker.of("error_code", () -> "404");
    log.info(marker, e.getMessage());

    ApiErrorResponse response = new ApiErrorResponse(
        "Not found",
        "404",
        e.getClass().getSimpleName(),
        e.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
  }

  @ExceptionHandler(NotAuthorizedException.class)
  public ResponseEntity<ApiErrorResponse> handleNotAuthorizedException(final NotAuthorizedException e) {
    LabelMarker marker = LabelMarker.of("error_code", () -> "401");
    log.info(marker, e.getMessage());

    ApiErrorResponse response = new ApiErrorResponse(
        "Not authorized",
        "401",
        e.getClass().getSimpleName(),
        e.getMessage());
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
  }

  @ExceptionHandler(ForbiddenException.class)
  public ResponseEntity<ApiErrorResponse> handleForbiddenException(final ForbiddenException e) {
    LabelMarker marker = LabelMarker.of("error_code", () -> "403");
    log.info(marker, e.getMessage());

    ApiErrorResponse response = new ApiErrorResponse(
        "Forbidden",
        "403",
        e.getClass().getSimpleName(),
        e.getMessage());
    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
  }

  @ExceptionHandler(NotAcceptableException.class)
  public ResponseEntity<ApiErrorResponse> handleNotAcceptableException(final NotAcceptableException e) {
    LabelMarker marker = LabelMarker.of("error_code", () -> "406");
    log.info(marker, e.getMessage());

    ApiErrorResponse response = new ApiErrorResponse(
        "Not acceptable",
        "406",
        e.getClass().getSimpleName(),
        e.getMessage());
    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body(response);
  }

  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<ApiErrorResponse> handleBadRequestException(final BadRequestException e) {
    LabelMarker marker = LabelMarker.of("error_code", () -> "400");
    log.info(marker, e.getMessage());

    ApiErrorResponse response = new ApiErrorResponse(
        "Bad request",
        "400",
        e.getClass().getSimpleName(),
        e.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  @ExceptionHandler(MissingRequestHeaderException.class)
  public ResponseEntity<ApiErrorResponse> handleMissingRequestHeaderException(final MissingRequestHeaderException e) {
    LabelMarker marker = LabelMarker.of("error_code", () -> "400");
    log.info(marker, e.getMessage());

    ApiErrorResponse response = new ApiErrorResponse(
        "Missing request header",
        "400",
        e.getClass().getSimpleName(),
        e.getMessage());
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleException(final Exception e) {
    LabelMarker marker = LabelMarker.of("error_code", () -> "500");
    log.error(marker, e.getMessage());
    List<String> errors = List.of(Arrays.toString(e.getStackTrace()));
    log.error(errors.toString());

    ApiErrorResponse response = new ApiErrorResponse(
        "Internal Server Error",
        "500",
        e.getClass().getSimpleName(),
        e.getMessage());
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
  }
}
