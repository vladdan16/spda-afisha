package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.models.User;
import com.vladdan16.spda_afisha.backend.domain.models.UserRole;
import com.vladdan16.spda_afisha.backend.domain.repositories.UserRepository;
import com.vladdan16.spda_afisha.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JpaAuthService implements AuthService {
  private final UserRepository userRepository;

  @Override
  public void signUp(
      String name,
      String surname,
      String login,
      String password,
      UserRole role
  ) {
    var id = UUID.randomUUID().toString();
    // TODO: save passwords using hash function
    var user = new User(
        id,
        name,
        surname,
        login,
        password,
        role,
        new ArrayList<>()
    );
    userRepository.save(user);
  }

  // TODO: implement other methods
}
