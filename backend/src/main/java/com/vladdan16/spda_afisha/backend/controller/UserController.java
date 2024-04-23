package com.vladdan16.spda_afisha.backend.controller;

import com.github.loki4j.slf4j.marker.LabelMarker;
import com.vladdan16.spda_afisha.backend.dto.requests.user.CreateUserRequest;
import com.vladdan16.spda_afisha.backend.dto.requests.user.UpdateUserRequest;
import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;
import com.vladdan16.spda_afisha.backend.service.FirebaseService;
import com.vladdan16.spda_afisha.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final FirebaseService firebaseService;

  /**
   * Creates User
   *
   * @param authHeader Authorization token
   * @param request    User's data
   * @return Void
   */
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

    LabelMarker marker = LabelMarker.of("uid", token::getUid);
    log.info(marker, "User successfully created");

    return ResponseEntity.ok().build();
  }

  /**
   * Get user's data
   *
   * @param authHeader Authorization token
   * @return Information about user
   */
  @GetMapping
  public ResponseEntity<UserResponse> getUser(
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    final var response = userService.getUserByUid(token.getUid());

    LabelMarker marker = LabelMarker.of("uid", token::getUid);
    log.info(marker, "User successfully retrieved");

    return ResponseEntity.ok(response);
  }

  /**
   * Deletes current user
   *
   * @param authHeader Authorization token
   * @return Void
   */
  @DeleteMapping
  public ResponseEntity<Void> deleteUser(
      @RequestHeader("Authorization") final String authHeader
  ) {
    final var token = firebaseService.decodeToken(authHeader);
    userService.deleteUserByUid(token.getUid());

    LabelMarker marker = LabelMarker.of("uid", token::getUid);
    log.info(marker, "User successfully deleted");

    return ResponseEntity.ok().build();
  }

  /**
   * Updated user info
   *
   * @param request    User's data
   * @param authHeader Authorization token
   * @return Void
   */
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

    LabelMarker marker = LabelMarker.of("uid", token::getUid);
    log.info(marker, "User successfully updated");

    return ResponseEntity.ok().build();
  }
}
