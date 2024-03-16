package com.vladdan16.spda_afisha.backend.domain.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "user_table")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
  @Id
  private String id;

  private String name;

  private String surname;

  @Column(unique = true)
  private String login;

  private String password;

  @Enumerated(EnumType.STRING)
  private UserRole role;

  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(
      name = "enrolls",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id")
  )
  private List<Event> events;
}
