package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.dto.requests.SignupRequest;
import com.vladdan16.spda_afisha.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AuthController {
  private final AuthService authService;

  @PostMapping("/sign_up")
  public ResponseEntity<Void> signUp(@RequestBody SignupRequest request) {
    // TODO: add validation for user data
    authService.signUp(
        request.name(),
        request.surname(),
        request.login(),
        request.password(),
        request.role()
    );
    return ResponseEntity.ok().build();
  }

  // TODO: implement other routes
}
