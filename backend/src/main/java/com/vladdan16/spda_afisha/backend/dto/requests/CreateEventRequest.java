package com.vladdan16.spda_afisha.backend.dto.requests;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.OffsetDateTime;

public record CreateEventRequest(String name, String type,
                                 @JsonProperty("start_at") OffsetDateTime startAt,
                                 @JsonProperty("number_seats") Long numberSeats,
                                 String description) {
}
