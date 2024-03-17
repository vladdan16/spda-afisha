package com.vladdan16.spda_afisha.backend.dto.requests.user;

import com.vladdan16.spda_afisha.backend.domain.models.UserRole;
import jakarta.validation.constraints.NotNull;

public record UpdateUserRequest(
    @NotNull
    String id,
    String name,
    String surname,
    String login,
    String password,
    UserRole role
) {}
