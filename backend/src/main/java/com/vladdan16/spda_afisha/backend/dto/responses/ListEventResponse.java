package com.vladdan16.spda_afisha.backend.dto.responses;

import java.util.List;

// TODO: adjust according to API if needed
public record ListEventResponse(Long size, List<EventResponse> events) {
}
