package com.vladdan16.spda_afisha.backend.dto.responses.events;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladdan16.spda_afisha.backend.domain.models.EventType;


import java.sql.Timestamp;
import java.util.List;

public record EventResponse(
    Long id,
    String name,
    String description,
    @JsonProperty("start_at")
    Timestamp startAt,
    @JsonProperty("number_seats")
    Long numberSeats,
    EventType type,
    List<String> images
) {}
