package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.domain.models.Event;
import com.vladdan16.spda_afisha.backend.domain.repositories.EventRepository;
import com.vladdan16.spda_afisha.backend.dto.responses.events.GetEventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.UUID;


@Service
@Transactional
@RequiredArgsConstructor
public class JpaEventService implements EventService {
  private final EventRepository eventRepository;

  @Override
  public void createEvent(
      String name,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  ) {
    var id = UUID.randomUUID().toString();
    var event = new Event(
        id,
        name,
        description,
        startAt,
        numberSeats,
        type,
        new ArrayList<>()
    );
    eventRepository.save(event);
  }

  @Override
  public ListEventResponse listEvents() {
    return new ListEventResponse(eventRepository.findAll());
  }

  @Override
  public void deleteEvent(String uuid) {
    eventRepository.deleteById(uuid);
  }

  @Override
  public GetEventResponse getEvent(String uuid) {
    var event = eventRepository.getById(uuid);
    return new GetEventResponse(
        event.getId(),
        event.getName(),
        event.getDescription(),
        event.getStartAt(),
        event.getNumberSeats(),
        event.getType()
    );
  }

  @Override
  public void updateEvent(
      @NotNull String id,
      String name,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  ) {
    var event = eventRepository.getById(id);

    if (name != null) event.setName(name);
    if (description != null) event.setDescription(description);
    if (startAt != null) event.setStartAt(startAt);
    if (numberSeats != null) event.setNumberSeats(numberSeats);
    if (type != null) event.setType(type);
  }
}
