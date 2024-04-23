package com.vladdan16.spda_afisha.backend.dto.responses.events;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;


import java.sql.Timestamp;
import java.util.List;

public record OwnerEventResponse(
    Long id,
    String name,
    String place,
    String description,
    @JsonProperty("start_at")
    Timestamp startAt,
    @JsonProperty("number_seats")
    Long numberSeats,
    @JsonProperty("available_seats")
    Long availableSeats,
    EventType type,
    List<String> images,
    @JsonProperty("enrolled_users")
    List<UserResponse> enrolledUsers
) {}
