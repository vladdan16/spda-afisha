package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.domain.models.UserRole;

public interface AuthService {
  void signUp(
      String name,
      String surname,
      String login,
      String password,
      UserRole role
  );

  // TODO: add other methods related to auth
}
