package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.dto.responses.ListEventResponse;

import java.time.OffsetDateTime;

public interface EventService {
  void createEvent(String name, String type, OffsetDateTime startAt, Long numberSeats, String description);

  ListEventResponse listEvents();

  // TODO: create other methods for events
}
