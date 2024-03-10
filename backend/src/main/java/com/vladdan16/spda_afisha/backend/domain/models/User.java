package com.vladdan16.spda_afisha.backend.domain.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  // TODO: adjust according to API if needed
  @Id
  private String id;

  private String login;

  private String password;
}
