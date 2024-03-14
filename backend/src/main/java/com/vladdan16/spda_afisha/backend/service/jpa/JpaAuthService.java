package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.models.User;
import com.vladdan16.spda_afisha.backend.domain.models.UserRole;
import com.vladdan16.spda_afisha.backend.domain.repositories.UserRepository;
import com.vladdan16.spda_afisha.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class JpaAuthService implements AuthService {
  private final UserRepository userRepository;

  @Override
  public void signUp(String login, String password, UserRole role) {
    // TODO: adjust according to API if needed
    var id = UUID.randomUUID().toString();
    var user = new User(id, login, password, role);
    userRepository.save(user);
  }

  // TODO: implement other methods
}
