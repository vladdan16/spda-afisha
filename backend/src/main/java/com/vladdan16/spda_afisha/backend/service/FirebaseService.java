package com.vladdan16.spda_afisha.backend.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.vladdan16.spda_afisha.backend.domain.exceptions.NotAuthorizedException;
import org.springframework.stereotype.Service;

/**
 * Service that is responsible for extracting information about user
 * from authorization token
 */
@Service
public class FirebaseService {
  public FirebaseToken decodeToken(String header) {
    try {
    String idToken = header.replace("Bearer ", "");
      return FirebaseAuth
          .getInstance()
          .verifyIdToken(idToken);
    } catch (Exception e) {
      throw new NotAuthorizedException(e.getMessage(), e.getCause());
    }
  }
}
