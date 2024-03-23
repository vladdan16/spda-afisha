package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;

public interface UserService {
  UserResponse getUserByUid(String uid);

  void deleteUserByUid(String uid);

  void createUser(
      String uid,
      String email,
      String name,
      String surname
  );

  void updateUser(
      String uid,
      String email,
      String name,
      String surname
  );
}
