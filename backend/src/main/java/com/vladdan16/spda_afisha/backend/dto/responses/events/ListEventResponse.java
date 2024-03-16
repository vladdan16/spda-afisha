package com.vladdan16.spda_afisha.backend.dto.responses.events;

import com.vladdan16.spda_afisha.backend.domain.models.Event;

import java.util.List;

public record ListEventResponse(
    List<Event> events
) {}
