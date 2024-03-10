package com.vladdan16.spda_afisha.backend.dto.responses;

import java.util.List;

public record ApiErrorResponse(String description,
                               String code,
                               String exceptionName,
                               String exceptionMessage,
                               List<String> stacktrace) {
}
