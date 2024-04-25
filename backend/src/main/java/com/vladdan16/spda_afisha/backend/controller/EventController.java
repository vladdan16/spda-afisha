package com.vladdan16.spda_afisha.backend.controller;

import com.github.loki4j.slf4j.marker.LabelMarker;
import com.vladdan16.spda_afisha.backend.dto.requests.events.CreateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.events.DeleteImagesRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.events.UpdateEventRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListOwnerEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import com.vladdan16.spda_afisha.backend.service.FirebaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
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
        request.place(),
        request.description(),
        request.startAt(),
        request.numberSeats(),
        request.type()
    );

    LabelMarker marker = LabelMarker.of(() -> Map.of(
        "uid", token.getUid(),
        "event_id", id.toString()));
    log.info(marker, "POST /event Request: {}, Response: {}, UID: {}", request, id, token.getUid());

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

    log.info("GET /event/list Response: {}", response);

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

    LabelMarker marker = LabelMarker.of(() -> Map.of(
        "uid", token.getUid(),
        "event_id", eventId.toString()));
    log.info(marker, "DELETE /event Response: OK, event_id: {}, UID: {}", eventId, token.getUid());

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

    LabelMarker marker = LabelMarker.of("event_id", eventId::toString);
    log.info(marker, "GET /event/{} Response: {}", eventId, response);

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
        request.place(),
        request.description(),
        request.startAt(),
        request.numberSeats(),
        request.type()
    );

    LabelMarker marker = LabelMarker.of(() -> Map.of(
        "uid", token.getUid(),
        "event_id", request.id().toString()));
    log.info(marker, "PATCH /event Request: {}, Response: OK, UID: {}", request, token.getUid());

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
  public ResponseEntity<String> uploadImage(
      @RequestHeader("Authorization") final String authHeader,
      @PathVariable Long eventId,
      @RequestParam("file") MultipartFile file
  ) {
    final var token = firebaseService.decodeToken(authHeader);

    var imageName = eventService.saveImage(eventId, token.getUid(), file);

    LabelMarker marker = LabelMarker.of(() -> Map.of(
        "uid", token.getUid(),
        "event_id", eventId.toString(),
        "image", imageName));
    log.info(marker, "POST /event/{}/image Response: {}, UID: {}", eventId, imageName, token.getUid());

    return ResponseEntity.ok(imageName);
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

    LabelMarker marker = LabelMarker.of("uid", token::getUid);
    log.info(marker, "POST /event/{}/delete_images Request: {}, Response: OK, UID: {}", eventId, request, token.getUid());

    return ResponseEntity.ok().build();
  }

  /**
   * List of all events that authorized user created
   *
   * @param authHeader Authentication token
   * @return List of EventResponses
   */
  @GetMapping("/my_events")
  public ResponseEntity<ListOwnerEventResponse> listMyEvents(
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    final var response = eventService.listMyEvents(token.getUid());

    LabelMarker marker = LabelMarker.of("uid", token::getUid);
    log.info(marker, "GET /event/my_events Response: {}, UID: {}", response, token.getUid());

    return ResponseEntity.ok(response);
  }
}
