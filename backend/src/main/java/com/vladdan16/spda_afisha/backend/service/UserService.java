package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.domain.models.UserRole;
import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;

public interface UserService {
  UserResponse getUserByLogin(String id);

  void deleteUser(String id);

  void createUser(
      String name,
      String surname,
      String login,
      String password,
      UserRole role
  );

  void updateUser(
      String id,
      String name,
      String surname,
      String login,
      String password,
      UserRole role
  );
}
