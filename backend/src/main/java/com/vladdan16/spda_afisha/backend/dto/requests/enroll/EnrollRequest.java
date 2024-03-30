package com.vladdan16.spda_afisha.backend.dto.requests.enroll;

import com.fasterxml.jackson.annotation.JsonProperty;

public record EnrollRequest(
    @JsonProperty("event_id")
    Long eventId
) {}
