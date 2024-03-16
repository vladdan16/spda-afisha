package com.vladdan16.spda_afisha.backend.domain.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "events")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
  @Id
  private String id;

  private String name;

  private String description;

  private Timestamp startAt;

  private Long numberSeats;

  @Enumerated(EnumType.STRING)
  private EventType type;

  @ManyToMany(mappedBy = "events")
  private List<User> users;
}
