package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListOwnerEventResponse;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.List;

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

  String saveImage(Long eventId, String userId, MultipartFile file);

  void deleteImages(Long eventId, String userId, List<String> images);

  ListOwnerEventResponse listMyEvents(String userId);
}
