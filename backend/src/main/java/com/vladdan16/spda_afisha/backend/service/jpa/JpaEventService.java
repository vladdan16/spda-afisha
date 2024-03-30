package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.exceptions.ForbiddenException;
import com.vladdan16.spda_afisha.backend.domain.exceptions.NotFoundException;
import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.domain.models.Event;
import com.vladdan16.spda_afisha.backend.domain.repositories.EventRepository;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


@Service
@Transactional
@RequiredArgsConstructor
public class JpaEventService implements EventService {
  private final EventRepository eventRepository;

  @Override
  public Long createEvent(
      String userId,
      String name,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  ) {
    var event = Event.builder()
        .authorId(userId)
        .name(name)
        .description(description)
        .startAt(startAt)
        .numberSeats(numberSeats)
        .type(type)
        .build();
    eventRepository.save(event);
    return event.getId();
  }

  @Override
  public ListEventResponse listEvents() {
    return new ListEventResponse(eventRepository
        .findAll()
        .stream()
        .map((event) -> new EventResponse(
            event.getId(),
            event.getName(),
            event.getDescription(),
            event.getStartAt(),
            event.getNumberSeats(),
            event.getType())
        ).toList());
  }

  @Override
  public void deleteEvent(String userId, Long id) {
    var event = eventRepository.getEventById(id);
    if (event == null) {
      throw new NotFoundException("Event not found", null);
    }

    if (!event.getAuthorId().equals(userId)) {
      throw new ForbiddenException("Unable to delete event not created by current user", null);
      }
    eventRepository.deleteById(id);
  }

  @Override
  public EventResponse getEvent(Long id) {
    var event = eventRepository.getEventById(id);
    if (event == null) {
      throw new NotFoundException("Event not found", null);
    }

    return new EventResponse(
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
      String userId,
      @NotNull Long id,
      String name,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  ) {
    var event = eventRepository.getEventById(id);
    if (event == null) {
      throw new NotFoundException("Event not found", null);
    }

    if (!event.getAuthorId().equals(userId)) {
      throw new ForbiddenException("Unable to edit event not created by current user", null);
    }

    if (name != null) {
      event.setName(name);
    }
    if (description != null) {
      event.setDescription(description);
    }
    if (startAt != null) {
      event.setStartAt(startAt);
    }
    if (numberSeats != null) {
      event.setNumberSeats(numberSeats);
    }
    if (type != null) {
      event.setType(type);
    }
  }

  @Override
  public ListEventResponse listMyEvents(String userId) {
    return new ListEventResponse(eventRepository
        .findByAuthorId(userId)
        .stream()
        .map((event) -> new EventResponse(
            event.getId(),
            event.getName(),
            event.getDescription(),
            event.getStartAt(),
            event.getNumberSeats(),
            event.getType())
        ).toList());
  }
}
