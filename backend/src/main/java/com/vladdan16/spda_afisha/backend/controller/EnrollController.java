package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.enroll.EnrollRequest;
import com.vladdan16.spda_afisha.backend.service.EnrollService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enroll")
@RequiredArgsConstructor
public class EnrollController {
  private final EnrollService enrollService;

  @PostMapping
  public ResponseEntity<Void> createEnroll(@RequestBody final EnrollRequest request) {
    enrollService.createEnroll(
        request.userId(),
        request.eventId()
    );
    return ResponseEntity.ok().build();
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteEnroll(
      @RequestParam("user_id") final String userId,
      @RequestParam("event_id") final Long eventId
  ) {
    enrollService.deleteEnroll(
        userId,
        eventId
    );
    return ResponseEntity.ok().build();
  }
}
