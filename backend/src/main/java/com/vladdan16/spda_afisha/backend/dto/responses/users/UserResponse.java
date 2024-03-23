package com.vladdan16.spda_afisha.backend.dto.responses.users;

import com.vladdan16.spda_afisha.backend.domain.models.UserRole;

public record UserResponse(
    String uid,
    String email,
    String name,
    String surname,
    UserRole role
) { }
