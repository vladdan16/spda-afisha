package com.vladdan16.spda_afisha.backend.controller;

import com.github.loki4j.slf4j.marker.LabelMarker;
import com.vladdan16.spda_afisha.backend.dto.responses.enrolls.ListEnrollResponse;
import com.vladdan16.spda_afisha.backend.service.EnrollService;
import com.vladdan16.spda_afisha.backend.service.FirebaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/enroll")
@RequiredArgsConstructor
public class EnrollController {
  private final EnrollService enrollService;
  private final FirebaseService firebaseService;

  /**
   * Enrolls user to specified event
   *
   * @param authHeader Authorization token
   * @param eventId    Long event ID
   * @return Void
   */
  @PostMapping
  public ResponseEntity<Void> createEnroll(
      @RequestHeader("Authorization") final String authHeader,
      @RequestParam final Long eventId
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    enrollService.createEnroll(
        token.getUid(),
        eventId
    );

    LabelMarker marker = LabelMarker.of(() -> Map.of(
        "uid", token.getUid(),
        "event_id", eventId.toString()
    ));
    log.info(marker, "User successfully enrolled");

    return ResponseEntity.ok().build();
  }

  /**
   * Cancels the user's enroll
   *
   * @param authHeader Authorization token
   * @param eventId    Long event ID
   * @return Void
   */
  @DeleteMapping
  public ResponseEntity<Void> deleteEnroll(
      @RequestHeader("Authorization") final String authHeader,
      @RequestParam final Long eventId
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    enrollService.deleteEnroll(
        token.getUid(),
        eventId
    );

    LabelMarker marker = LabelMarker.of(() -> Map.of(
        "uid", token.getUid(),
        "event_id", eventId.toString()
    ));
    log.info(marker, "User successfully unenrolled");

    return ResponseEntity.ok().build();
  }

  /**
   * Lists all enrolls of user
   *
   * @param authHeader Authorization token
   * @return List of Events where user is enrolled
   */
  @GetMapping("/my_enrolls")
  public ResponseEntity<ListEnrollResponse> listEnrolls(
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    final var response = enrollService.getEnrollsByUser(
        token.getUid()
    );

    LabelMarker marker = LabelMarker.of("uid", token::getUid);
    log.info(marker, "User retrieved their enrolls");

    return ResponseEntity.ok(response);
  }
}
