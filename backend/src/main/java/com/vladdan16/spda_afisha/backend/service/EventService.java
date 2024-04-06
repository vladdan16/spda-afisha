package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;

public interface EventService {
  Long createEvent(
      String userId,
      String name,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  );

  ListEventResponse listEvents();

  void deleteEvent(String userId, Long id);

  EventResponse getEvent(Long id);

  void updateEvent(
      String userId,
      Long id,
      String name,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  );

  void saveImage(Long eventId, String userId, MultipartFile file);

  ListEventResponse listMyEvents(String userId);
}
