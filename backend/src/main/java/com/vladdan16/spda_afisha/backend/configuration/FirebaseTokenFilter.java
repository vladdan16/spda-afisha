package com.vladdan16.spda_afisha.backend.configuration;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.filter.GenericFilterBean;

@Slf4j
public class FirebaseTokenFilter extends GenericFilterBean {
  @SneakyThrows
  @Override
  public void doFilter(
      ServletRequest request,
      ServletResponse response,
      FilterChain chain
  ) {
    HttpServletRequest httpRequest = (HttpServletRequest) request;
    HttpServletResponse httpResponse = (HttpServletResponse) response;
    String authToken = httpRequest.getHeader("Authorization");

    String path = httpRequest.getRequestURI();
    if (path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui")) {
      chain.doFilter(request, response);
      return;
    }

    try {
      if (authToken != null && !authToken.isEmpty()) {
        authToken = authToken.replace("Bearer ", "");
        FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();
        FirebaseToken decodedToken = firebaseAuth
            .verifyIdToken(authToken);
        log.info("Token verified: {}", decodedToken.getUid());
        chain.doFilter(request, response);
      } else {
        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Not authorized");
      }
    } catch (Exception e) {
      httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid authorization token");
    }
  }
}
