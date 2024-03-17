package com.vladdan16.spda_afisha.backend.dto.responses.users;

import com.vladdan16.spda_afisha.backend.domain.models.UserRole;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;

import java.util.List;

public record UserResponse(
    String id,
    String name,
    String surname,
    String login,
    UserRole role,
    List<EventResponse> events
) { }
