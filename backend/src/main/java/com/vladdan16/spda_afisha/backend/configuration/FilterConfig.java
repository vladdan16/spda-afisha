package com.vladdan16.spda_afisha.backend.configuration;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {
  @Bean
  public FilterRegistrationBean<FirebaseTokenFilter> firebaseTokenFilter() {
    FilterRegistrationBean<FirebaseTokenFilter> registrationBean = new FilterRegistrationBean<>();
    registrationBean.setFilter(new FirebaseTokenFilter());
    return registrationBean;
  }
}
