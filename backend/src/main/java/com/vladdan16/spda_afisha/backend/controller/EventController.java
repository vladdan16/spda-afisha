package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.events.CreateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.events.UpdateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<Void> deleteEvent(@RequestParam final Long id) {
    eventService.deleteEvent(id);
    return ResponseEntity.ok().build();
  }

  @GetMapping
  public ResponseEntity<EventResponse> getEvent(@RequestParam final Long id) {
    var response = eventService.getEvent(id);
    return ResponseEntity.ok(response);
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
