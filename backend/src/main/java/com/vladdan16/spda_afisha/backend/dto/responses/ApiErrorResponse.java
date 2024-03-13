package com.vladdan16.spda_afisha.backend.dto.responses;

public record ApiErrorResponse(
        String description,
        String code,
        String exceptionName,
        String exceptionMessage) {
}
