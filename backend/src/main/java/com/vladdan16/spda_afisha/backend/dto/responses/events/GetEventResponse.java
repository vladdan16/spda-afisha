package com.vladdan16.spda_afisha.backend.dto.responses.events;

import com.vladdan16.spda_afisha.backend.domain.models.EventType;


import java.sql.Timestamp;

public record GetEventResponse(
    String id,
    String name,
    String description,
    Timestamp startAt,
    Long numberSeats,
    EventType type
) {}
