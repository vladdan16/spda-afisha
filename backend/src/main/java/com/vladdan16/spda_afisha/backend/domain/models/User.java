package com.vladdan16.spda_afisha.backend.domain.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  // TODO: adjust according to API if needed
  @Id
  private String id;

  private String login;

  private String password;

  @Enumerated(EnumType.STRING)
  private UserRole role;
}
