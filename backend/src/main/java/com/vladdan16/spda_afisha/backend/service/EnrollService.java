package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.dto.responses.enrolls.ListEnrollResponse;

public interface EnrollService {
  void createEnroll(
      String userId,
      Long eventId
  );

  void deleteEnroll(
      String userId,
      Long eventId
  );

  ListEnrollResponse getEnrollsByUser(
      String userId
  );
}
