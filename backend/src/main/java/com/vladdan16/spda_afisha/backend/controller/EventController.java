package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.events.CreateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.events.DeleteImagesRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.events.UpdateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import com.vladdan16.spda_afisha.backend.service.FirebaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/event")
@RequiredArgsConstructor
public class EventController {
  private final EventService eventService;
  private final FirebaseService firebaseService;

  /**
   * Creates Event
   *
   * @param authHeader Authorization token
   * @param request    Request with information about Event
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
   *
   * @return List of events
   */
  @GetMapping("/list")
  public ResponseEntity<ListEventResponse> listEvents() {
    var response = eventService.listEvents();
    return ResponseEntity.ok(response);
  }

  /**
   * Deletes event
   *
   * @param authHeader Authorization token
   * @param eventId    ID of Event
   * @return Void
   */
  @DeleteMapping("/{eventId}")
  public ResponseEntity<Void> deleteEvent(
      @RequestHeader("Authorization") final String authHeader,
      @PathVariable final Long eventId
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    eventService.deleteEvent(token.getUid(), eventId);
    return ResponseEntity.ok().build();
  }

  /**
   * Obtains information about specific Event
   *
   * @param eventId ID of event
   * @return Event
   */
  @GetMapping("/{eventId}")
  public ResponseEntity<EventResponse> getEvent(@PathVariable final Long eventId) {
    var response = eventService.getEvent(eventId);
    return ResponseEntity.ok(response);
  }

  /**
   * Updates information about event
   *
   * @param authHeader Authorization token
   * @param request    Description of the Event
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

  /**
   * Saves an image for event
   *
   * @param authHeader Authentication token
   * @param eventId    ID of event where to upload an image
   * @param file       Image itself as file
   * @return Void
   */
  @PostMapping("/{eventId}/image")
  public ResponseEntity<Void> uploadImage(
      @RequestHeader("Authorization") final String authHeader,
      @PathVariable Long eventId,
      @RequestParam("file") MultipartFile file
  ) {
    final var token = firebaseService.decodeToken(authHeader);

    eventService.saveImage(eventId, token.getUid(), file);

    return ResponseEntity.ok().build();
  }

  /**
   * Deletes images from specified event
   *
   * @param authHeader Authentication token
   * @param eventId    ID of event
   * @param request    Request containing list of images
   * @return Void
   */
  @PostMapping("/{eventId}/delete_images")
  public ResponseEntity<Void> deleteImages(
      @RequestHeader("Authorization") final String authHeader,
      @PathVariable Long eventId,
      @RequestBody DeleteImagesRequest request
  ) {
    final var token = firebaseService.decodeToken(authHeader);

    eventService.deleteImages(eventId, token.getUid(), request.images());

    return ResponseEntity.ok().build();
  }

  /**
   * List of all events that authorized user created
   *
   * @param authHeader Authentication token
   * @return List of EventResponses
   */
  @GetMapping("/my_events")
  public ResponseEntity<ListEventResponse> listMyEvents(
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    final var response = eventService.listMyEvents(token.getUid());
    return ResponseEntity.ok(response);
  }
}
