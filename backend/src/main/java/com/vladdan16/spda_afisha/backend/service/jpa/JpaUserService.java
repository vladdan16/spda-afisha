package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.exceptions.NotAcceptableException;
import com.vladdan16.spda_afisha.backend.domain.exceptions.NotFoundException;
import com.vladdan16.spda_afisha.backend.domain.models.User;
import com.vladdan16.spda_afisha.backend.domain.models.UserRole;
import com.vladdan16.spda_afisha.backend.domain.repositories.UserRepository;
import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;
import com.vladdan16.spda_afisha.backend.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class JpaUserService implements UserService {
  private final UserRepository userRepository;

  @Override
  public UserResponse getUserByUid(String uid) {
    final var user = userRepository.getUserById(uid);
    if (user == null) {
      throw new NotFoundException("User not found");
    }
    return new UserResponse(
        user.getEmail(),
        user.getName(),
        user.getSurname());
  }

  @Override
  public void deleteUserByUid(String uid) {
    final var user = userRepository.getUserById(uid);
    if (user == null) {
      throw new NotFoundException("User not found");
    }
    userRepository.deleteById(uid);
  }

  @Override
  public void createUser(
      String uid,
      String email,
      String name,
      String surname
  ) {
    var user = userRepository.getUserById(uid);
    if (user != null) {
      throw new NotAcceptableException("User already exists");
    }

    user = User.builder()
        .id(uid)
        .email(email)
        .name(name)
        .surname(surname)
        .role(UserRole.USER)
        .build();
    userRepository.save(user);
  }

  @Override
  public void updateUser(
      String uid,
      String email,
      String name,
      String surname
  ) {
    final var user = userRepository.getUserById(uid);
    if (user == null) {
      throw new NotFoundException("User not found");
    }

    if (email != null) {
      user.setEmail(email);
    }
    if (name != null) {
      user.setName(name);
    }
    if (surname != null) {
      user.setSurname(surname);
    }
  }
}
