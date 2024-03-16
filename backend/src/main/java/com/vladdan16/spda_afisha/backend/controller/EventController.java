package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.events.CreateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.events.UpdateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.events.GetEventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
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
  @PostMapping
  public ResponseEntity<Void> createEvent(@RequestBody final CreateEventRequest request) {
    eventService.createEvent(
        request.name(),
        request.description(),
        request.startAt(),
        request.numberSeats(),
        request.type()
    );
    return ResponseEntity.ok().build();
  }

  // Non-admin's routes
  @GetMapping("/list")
  public ResponseEntity<ListEventResponse> listEvents() {
    var response = eventService.listEvents();
    return ResponseEntity.ok(response);
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteEvent(@RequestParam final String id) {
    eventService.deleteEvent(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping
  public GetEventResponse getEvent(@RequestParam final String id) {
    return eventService.getEvent(id);
  }

  @PatchMapping
  public ResponseEntity<Void> updateEvent(@RequestBody final UpdateEventRequest request) {
    eventService.updateEvent(
        request.id(),
        request.name(),
        request.description(),
        request.startAt(),
        request.numberSeats(),
        request.type()
    );
    return ResponseEntity.ok().build();
  }
}
