package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.user.CreateUserRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.user.UpdateUserRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;
import com.vladdan16.spda_afisha.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;

  @PostMapping
  public ResponseEntity<Void> createUser(@RequestBody final CreateUserRequest request) {
    userService.createUser(
        request.name(),
        request.surname(),
        request.login(),
        request.password(),
        request.role()
    );
    return ResponseEntity.ok().build();
  }

  @GetMapping
  public ResponseEntity<UserResponse> getUser(@RequestParam final String login) {
    final var response = userService.getUserByLogin(login);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping
  public ResponseEntity<Void> deleteUser(@RequestParam final String id) {
    userService.deleteUser(id);
    return ResponseEntity.ok().build();
  }

  @PatchMapping
  public ResponseEntity<Void> updateUser(@RequestBody final UpdateUserRequest request) {
    userService.updateUser(
        request.id(),
        request.name(),
        request.surname(),
        request.login(),
        request.password(),
        request.role()
    );
    return ResponseEntity.ok().build();
  }
}
