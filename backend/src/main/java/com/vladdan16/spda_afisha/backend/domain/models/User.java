package com.vladdan16.spda_afisha.backend.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
import lombok.*;

import java.util.List;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_table")
public class User {
  @Id
  private String id;

  private String email;

  private String name;

  private String surname;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private UserRole role;

  @ToString.Exclude
  @JsonIgnore
  @ManyToMany(cascade = CascadeType.ALL)
  @JoinTable(
      name = "enrolls",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id")
  )
  private List<Event> events;
}
