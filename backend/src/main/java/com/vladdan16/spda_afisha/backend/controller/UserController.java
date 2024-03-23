package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.user.CreateUserRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.user.UpdateUserRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;
import com.vladdan16.spda_afisha.backend.service.FirebaseService;
import com.vladdan16.spda_afisha.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final FirebaseService firebaseService;

  @PostMapping
  public ResponseEntity<Void> createUser(
      @RequestHeader("Authorization") final String authHeader,
      @RequestBody final CreateUserRequest request
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    userService.createUser(
        token.getUid(),
        token.getEmail(),
        request.name(),
        request.surname()
    );
    return ResponseEntity.ok().build();
  }

  // TODO: надо ли нам ручка чтобы получить пользователя по почте (например, для админа)?
  @GetMapping
  public ResponseEntity<UserResponse> getUser(
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    final var response = userService.getUserByUid(token.getUid());
    return ResponseEntity.ok(response);
  }

  // TODO: админ может удалить пользователя? По ходу надо отдельно делать админские ручки
  @DeleteMapping
  public ResponseEntity<Void> deleteUser(
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    userService.deleteUserByUid(token.getUid());
    return ResponseEntity.ok().build();
  }

  // TODO: добавить возможность админам обновлять пользователя в т.ч. назначить роль (отдельная ручка)?
  @PatchMapping
  public ResponseEntity<Void> updateUser(
      @RequestBody final UpdateUserRequest request,
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    userService.updateUser(
        token.getUid(),
        token.getEmail(),
        request.name(),
        request.surname()
    );
    return ResponseEntity.ok().build();
  }

  // TODO: сделать ручку для получения ивентов по юзеру
}
