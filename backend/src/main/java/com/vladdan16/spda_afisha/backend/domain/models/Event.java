package com.vladdan16.spda_afisha.backend.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.*;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  private Long id;

  private String name;

  private String description;

  private Timestamp startAt;

  private Long numberSeats;

  @Enumerated(EnumType.STRING)
  private EventType type;

  @ToString.Exclude
  @JsonIgnore
  @ManyToMany(mappedBy = "events")
  private List<User> users;
}
