package com.vladdan16.spda_afisha.backend.dto.responses.events;

import java.util.List;

public record ListEventResponse(
    List<EventResponse> events
) {}
