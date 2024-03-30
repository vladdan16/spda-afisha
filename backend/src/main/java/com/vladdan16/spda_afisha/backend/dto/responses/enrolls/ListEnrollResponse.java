package com.vladdan16.spda_afisha.backend.dto.responses.enrolls;

import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;

import java.util.List;

public record ListEnrollResponse(List<EventResponse> enrolls) {
}
