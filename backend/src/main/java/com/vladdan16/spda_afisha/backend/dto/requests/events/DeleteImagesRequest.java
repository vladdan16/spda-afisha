package com.vladdan16.spda_afisha.backend.dto.requests.events;

import java.util.List;

public record DeleteImagesRequest(
    List<String> images
) {}
