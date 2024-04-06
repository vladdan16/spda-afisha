package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.exceptions.ForbiddenException;
import com.vladdan16.spda_afisha.backend.domain.exceptions.NotFoundException;
import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.domain.models.Event;
import com.vladdan16.spda_afisha.backend.domain.repositories.EventRepository;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import com.vladdan16.spda_afisha.backend.service.ImageService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;


@Service
@Transactional
@RequiredArgsConstructor
public class JpaEventService implements EventService {
  private final EventRepository eventRepository;
  private final ImageService imageService;

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
            event.getType(),
            event.getImages())
        ).toList());
  }

  @Override
  public void deleteEvent(String userId, Long id) {
    var event = eventRepository.getEventById(id);
    if (event == null) {
      throw new NotFoundException("Event not found");
    }

    if (!event.getAuthorId().equals(userId)) {
      throw new ForbiddenException("Unable to delete event not created by current user");
    }
    eventRepository.deleteById(id);
  }

  @Override
  public EventResponse getEvent(Long id) {
    var event = eventRepository.getEventById(id);
    if (event == null) {
      throw new NotFoundException("Event not found");
    }

    return new EventResponse(
        event.getId(),
        event.getName(),
        event.getDescription(),
        event.getStartAt(),
        event.getNumberSeats(),
        event.getType(),
        event.getImages()
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
      throw new NotFoundException("Event not found");
    }

    if (!event.getAuthorId().equals(userId)) {
      throw new ForbiddenException("Unable to edit event not created by current user");
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
  public void saveImage(Long eventId, String userId, MultipartFile file) {
    var event = eventRepository.getEventById(eventId);

    if (event == null) {
      throw new NotFoundException("Event not found");
    }

    if (!event.getAuthorId().equals(userId)) {
      throw new ForbiddenException("Unable to edit event not created by current user");
    }

    final var imageName = imageService.storeImage(file);

    event.getImages().add(imageName);
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
            event.getType(),
            event.getImages())
        ).toList());
  }
}
