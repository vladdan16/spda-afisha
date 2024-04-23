package com.vladdan16.spda_afisha.backend.configuration;

import com.github.loki4j.slf4j.marker.LabelMarker;
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

import java.util.Map;

/**
 * Filter that filters all incoming http requests
 * Checks for valid token except for specified paths
 */
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
    LabelMarker marker = LabelMarker.of("path", () -> path);
    // specify paths that does not require authorization
    if (path.startsWith("/v3/api-docs") || path.startsWith("/swagger-ui")
        || path.startsWith("/images") || path.startsWith("/observability")
        || path.startsWith("/event/list") || (httpRequest.getMethod().equals("GET") && path.startsWith("/event"))) {
      log.info(marker, "Skip authorisation for route {}", path);
      chain.doFilter(request, response);
      return;
    }

    try {
      if (authToken != null && !authToken.isEmpty()) {
        authToken = authToken.replace("Bearer ", "");
        FirebaseAuth firebaseAuth = FirebaseAuth.getInstance();
        FirebaseToken decodedToken = firebaseAuth
            .verifyIdToken(authToken);
        LabelMarker userMarker = LabelMarker.of(() -> Map.of(
            "path", path,
            "uid", decodedToken.getUid()));
        log.info(userMarker, "Request authorized for path {}", path);
        chain.doFilter(request, response);
      } else {
        log.info(marker, "Unauthorized, empty token for route {}", path);
        httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Not authorized, provide Authorization token");
      }
    } catch (Exception e) {
      httpResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid authorization token");
      log.info(marker, "Unauthorized, invalid token for route {}", path);
    }
  }
}
