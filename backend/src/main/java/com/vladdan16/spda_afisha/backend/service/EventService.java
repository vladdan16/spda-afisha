package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListOwnerEventResponse;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

/**
 * Service that is responsible for interactions with events
 */
public interface EventService {
  /**
   * Creates event with specified parameters
   *
   * @param userId      String user id - author of event
   * @param name        String short title of event
   * @param place       String name of place
   * @param description String description for event
   * @param startAt     Timestamp when event is started
   * @param numberSeats Number of seats available is this event
   * @param type        Type of the event. Possible values - MEETUP, STANDUP, CONCERT, OTHER
   * @return Long id of created event
   */
  Long createEvent(
      String userId,
      String name,
      String place,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  );

  /**
   * Lists all available events
   *
   * @return ListEventResponse
   */
  ListEventResponse listEvents();

  /**
   * Permanently deletes the event
   *
   * @param userId String author id
   * @param id     Long id of event
   */
  void deleteEvent(String userId, Long id);

  /**
   * Retrieves data for specified event
   *
   * @param id Long id of event
   * @return EventResponse
   */
  EventResponse getEvent(Long id);

  /**
   * Updates event with specified parameters, all fields except userId, and id
   * may not be null.
   *
   * @param userId      String user id - author of event
   * @param id          Long id of event
   * @param name        String short title of event
   * @param place       String name of place
   * @param description String description for event
   * @param startAt     Timestamp when event is started
   * @param numberSeats Number of seats available is this event
   * @param type        Type of the event. Possible values - MEETUP, STANDUP, CONCERT, OTHER
   */
  void updateEvent(
      String userId,
      Long id,
      String name,
      String place,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  );

  /**
   * Saves image for specified event
   *
   * @param eventId Long id of event
   * @param userId  String user id
   * @param file    Multipart file - image
   * @return String name of image
   */
  String saveImage(Long eventId, String userId, MultipartFile file);

  /**
   * Deletes image
   *
   * @param eventId Long id of event
   * @param userId  String user id
   * @param images  String name of image
   */
  void deleteImages(Long eventId, String userId, List<String> images);

  /**
   * Returns list of all events owned by specified user
   *
   * @param userId Long user id
   * @return ListOwnerEventResponse with events containing list of enrolled users
   */
  ListOwnerEventResponse listMyEvents(String userId);
}
