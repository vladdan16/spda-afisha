package com.vladdan16.spda_afisha.backend.service;

public interface EnrollService {
  void createEnroll(
      String userId,
      Long eventId
  );

  void deleteEnroll(
      String userId,
      Long eventId
  );
}
