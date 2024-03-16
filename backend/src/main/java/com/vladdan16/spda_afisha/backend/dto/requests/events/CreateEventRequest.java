package com.vladdan16.spda_afisha.backend.dto.requests.events;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladdan16.spda_afisha.backend.domain.models.EventType;

import java.sql.Timestamp;

public record CreateEventRequest(
    String name,
    String description,
    @JsonProperty("start_at")
    Timestamp startAt,
    @JsonProperty("number_seats")
    Long numberSeats,
    EventType type
) {}
