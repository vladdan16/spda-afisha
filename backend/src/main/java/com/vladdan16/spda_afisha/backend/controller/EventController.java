package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.events.CreateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.events.UpdateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import com.vladdan16.spda_afisha.backend.service.FirebaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class EventController {
  private final EventService eventService;
  private final FirebaseService firebaseService;

  /**
   * Creates Event
   * @param authHeader Authorization token
   * @param request Request with information about Event
   * @return Void
   */
  @PostMapping
  public ResponseEntity<Long> createEvent(
      @RequestHeader("Authorization") final String authHeader,
      @RequestBody final CreateEventRequest request
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    final var id = eventService.createEvent(
        token.getUid(),
        request.name(),
        request.description(),
        request.startAt(),
        request.numberSeats(),
        request.type()
    );
    return ResponseEntity.ok(id);
  }

  /**
   * Obtains list of events available to enroll
   * @return List of events
   */
  @GetMapping("/list")
  public ResponseEntity<ListEventResponse> listEvents() {
    var response = eventService.listEvents();
    return ResponseEntity.ok(response);
  }

  /**
   * Deletes event
   * @param authHeader Authorization token
   * @param id ID of Event
   * @return Void
   */
  @DeleteMapping
  public ResponseEntity<Void> deleteEvent(
      @RequestHeader("Authorization") final String authHeader,
      @RequestParam final Long id
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    eventService.deleteEvent(token.getUid(), id);
    return ResponseEntity.ok().build();
  }

  /**
   * Obtains information about specific Event
   * @param id ID of event
   * @return Event
   */
  @GetMapping
  public ResponseEntity<EventResponse> getEvent(@RequestParam final Long id) {
    var response = eventService.getEvent(id);
    return ResponseEntity.ok(response);
  }

  /**
   * Updates information about event
   * @param authHeader Authorization token
   * @param request Description of the Event
   * @return Void
   */
  @PatchMapping
  public ResponseEntity<Void> updateEvent(
      @RequestHeader("Authorization") final String authHeader,
      @RequestBody final UpdateEventRequest request
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    eventService.updateEvent(
        token.getUid(),
        request.id(),
        request.name(),
        request.description(),
        request.startAt(),
        request.numberSeats(),
        request.type()
    );
    return ResponseEntity.ok().build();
  }

  @GetMapping("/my_events")
  public ResponseEntity<ListEventResponse> listMyEvents(
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    final var response = eventService.listMyEvents(token.getUid());
    return ResponseEntity.ok(response);
  }
}
