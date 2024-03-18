package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;

import java.sql.Timestamp;

public interface EventService {
  void createEvent(
      String name,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  );

  ListEventResponse listEvents();

  void deleteEvent(Long id);

  EventResponse getEvent(Long id);

  void updateEvent(
      Long id,
      String name,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  );
}
