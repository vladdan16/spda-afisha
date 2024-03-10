package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.CreateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.ListEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class EventController {

  private final EventService eventService;

  // Admin's routes
  @PostMapping()
  public ResponseEntity<Void> createEvent(@RequestBody final CreateEventRequest request) {
    // TODO: adjust according to API if needed
    eventService.createEvent(request.name(), request.type(), request.startAt(), request.numberSeats(), request.description());
    return ResponseEntity.ok().build();
  }

  // Non-admin's routes
  @GetMapping("/list_events")
  public ResponseEntity<ListEventResponse> listEvents() {
    // TODO: adjust according to API if needed
    var response = eventService.listEvents();
    return ResponseEntity.ok(response);
  }

  // TODO: implement other routes related to events
}
