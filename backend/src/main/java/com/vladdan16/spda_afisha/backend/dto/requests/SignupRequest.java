package com.vladdan16.spda_afisha.backend.dto.requests;

import com.vladdan16.spda_afisha.backend.domain.models.UserRole;

public record SignupRequest(
    String login,
    String password,
    UserRole role) {
}
