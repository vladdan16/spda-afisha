package com.vladdan16.spda_afisha.backend.configuration;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;

@Slf4j
@Configuration
public class FirebaseConfig {
  @PostConstruct
  public void firebaseInit() {
    try {
      String filePath = System.getenv("FIREBASE_SERVICE_ACCOUNT_KEY_PATH");
      if (filePath == null || filePath.isEmpty()) {
        throw new IllegalStateException("Environment variable FIREBASE_SERVICE_ACCOUNT_KEY_PATH not set");
      }
      InputStream serviceAccount = new FileInputStream(filePath);
      FirebaseOptions options = FirebaseOptions.builder()
          .setCredentials(GoogleCredentials.fromStream(serviceAccount))
          .build();

      if (FirebaseApp.getApps().isEmpty()) {
        FirebaseApp.initializeApp(options);
        log.info("Firebase App Initialized");
      }

      log.info("FirebaseInit finished");
    } catch (IOException e) {
      log.error(Arrays.toString(e.getStackTrace()));
    }
  }
}
