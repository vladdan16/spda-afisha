package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.dto.responses.enrolls.ListEnrollResponse;

/**
 * Service that is responsible for enrolling users onto events
 */
public interface EnrollService {
  /**
   * Creates enroll
   *
   * @param userId  String user id
   * @param eventId Long id of event
   */
  void createEnroll(
      String userId,
      Long eventId
  );

  /**
   * Cancels already enrolled user
   *
   * @param userId  String user id
   * @param eventId Long id of event
   */
  void deleteEnroll(
      String userId,
      Long eventId
  );

  /**
   * Returns all enrolls for provided user
   *
   * @param userId String user id
   * @return ListEnrollResponse
   */
  ListEnrollResponse getEnrollsByUser(
      String userId
  );
}
