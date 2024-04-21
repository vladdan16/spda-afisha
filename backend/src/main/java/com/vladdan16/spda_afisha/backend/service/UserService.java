package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;

/**
 * Service that is responsible for interactions with User entity
 */
public interface UserService {
  /**
   * Retrieves user data by specified user is
   *
   * @param uid String user id
   * @return UserResponse containing main information about user
   */
  UserResponse getUserByUid(String uid);

  /**
   * Permanently deletes user from database
   *
   * @param uid String user id
   */
  void deleteUserByUid(String uid);

  /**
   * Creates user id database
   *
   * @param uid     String user id
   * @param email   String user's email
   * @param name    String user's name
   * @param surname String user's surname
   */
  void createUser(
      String uid,
      String email,
      String name,
      String surname
  );

  /**
   * Updates user's info
   *
   * @param uid     String user id
   * @param email   String user's email
   * @param name    String user's name
   * @param surname String user's surname
   */
  void updateUser(
      String uid,
      String email,
      String name,
      String surname
  );
}
