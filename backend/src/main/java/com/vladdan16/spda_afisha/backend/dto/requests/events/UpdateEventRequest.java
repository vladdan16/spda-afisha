package com.vladdan16.spda_afisha.backend.dto.requests.events;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;

public record UpdateEventRequest(
    @NotNull
    Long id,
    String name,
    String description,
    @JsonProperty("start_at")
    Timestamp startAt,
    @JsonProperty("number_seats")
    Long numberSeats,
    EventType type
) { }
