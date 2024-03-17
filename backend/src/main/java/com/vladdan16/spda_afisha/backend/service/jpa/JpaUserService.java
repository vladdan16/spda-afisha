package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.models.User;
import com.vladdan16.spda_afisha.backend.domain.models.UserRole;
import com.vladdan16.spda_afisha.backend.domain.repositories.UserRepository;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;
import com.vladdan16.spda_afisha.backend.service.UserService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class JpaUserService implements UserService {
  private final UserRepository userRepository;

  @Override
  public UserResponse getUserByLogin(String login) {
    final var user = userRepository.getUserByLogin(login);
    return new UserResponse(
        user.getId(),
        user.getName(),
        user.getSurname(),
        user.getLogin(),
        user.getRole(),
        user.getEvents()
            .stream()
            .map((event) -> new EventResponse(
                event.getId(),
                event.getName(),
                event.getDescription(),
                event.getStartAt(),
                event.getNumberSeats(),
                event.getType())
            ).toList());
  }

  @Override
  public void deleteUser(String id) {
    userRepository.deleteById(id);
  }

  @Override
  public void createUser(
      String name,
      String surname,
      String login,
      String password,
      UserRole role
  ) {
    // TODO: save passwords using hash function
    final var user = User.builder()
        .name(name)
        .surname(surname)
        .login(login)
        .password(password)
        .role(role)
        .build();
    userRepository.save(user);
  }

  @Override
  public void updateUser(
      @NotNull String id,
      String name,
      String surname,
      String login,
      String password,
      UserRole role
  ) {
    final var user = userRepository.getUserById(id);
    if (name != null) {
      user.setName(name);
    }
    if (surname != null) {
      user.setSurname(surname);
    }
    if (login != null) {
      user.setLogin(login);
    }
    if (password != null) {
      user.setPassword(password);
    }
    if (role != null) {
      user.setRole(role);
    }
  }
}
