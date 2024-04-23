package com.vladdan16.spda_afisha.backend.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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

  private String authorId;

  private String name;

  private String place;

  private String description;

  private Timestamp startAt;

  private Long numberSeats;

  private Long availableSeats;

  @Enumerated(EnumType.STRING)
  private EventType type;

  @ToString.Exclude
  @JsonIgnore
  @ManyToMany(mappedBy = "events")
  private List<User> users;

  @ElementCollection
  private List<String> images;
}
