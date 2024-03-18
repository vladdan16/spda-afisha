package com.vladdan16.spda_afisha.backend.dto.requests.user;

import com.vladdan16.spda_afisha.backend.domain.models.UserRole;

public record CreateUserRequest(
    String name,
    String surname,
    String login,
    String password,
    UserRole role
) {}
