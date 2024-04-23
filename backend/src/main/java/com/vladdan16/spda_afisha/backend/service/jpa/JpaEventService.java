package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.exceptions.ForbiddenException;
import com.vladdan16.spda_afisha.backend.domain.exceptions.NotFoundException;
import com.vladdan16.spda_afisha.backend.domain.models.EventType;
import com.vladdan16.spda_afisha.backend.domain.models.Event;
import com.vladdan16.spda_afisha.backend.domain.repositories.EventRepository;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListEventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.ListOwnerEventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.OwnerEventResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.users.UserResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import com.vladdan16.spda_afisha.backend.service.ImageService;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;


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
      String place,
      String description,
      Timestamp startAt,
      Long numberSeats,
      EventType type
  ) {
    var event = Event.builder()
        .authorId(userId)
        .name(name)
        .place(place)
        .description(description)
        .startAt(startAt)
        .numberSeats(numberSeats)
        .availableSeats(numberSeats)
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
            event.getPlace(),
            event.getDescription(),
            event.getStartAt(),
            event.getNumberSeats(),
            event.getAvailableSeats(),
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
    imageService.deleteAllImages(event.getImages());
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
        event.getPlace(),
        event.getDescription(),
        event.getStartAt(),
        event.getNumberSeats(),
        event.getAvailableSeats(),
        event.getType(),
        event.getImages()
    );
  }

  @Override
  public void updateEvent(
      String userId,
      @NotNull Long id,
      String name,
      String place,
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
    if (place != null) {
      event.setPlace(place);
    }
    if (description != null) {
      event.setDescription(description);
    }
    if (startAt != null) {
      event.setStartAt(startAt);
    }
    if (numberSeats != null) {
      event.setAvailableSeats(event.getAvailableSeats() + numberSeats - event.getNumberSeats());
      event.setNumberSeats(numberSeats);
    }
    if (type != null) {
      event.setType(type);
    }
  }

  @Override
  public String saveImage(Long eventId, String userId, MultipartFile file) {
    var event = eventRepository.getEventById(eventId);

    if (event == null) {
      throw new NotFoundException("Event not found");
    }

    if (!event.getAuthorId().equals(userId)) {
      throw new ForbiddenException("Unable to edit event not created by current user");
    }

    final var imageName = imageService.storeImage(file);

    event.getImages().add(imageName);

    return imageName;
  }

  @Override
  public void deleteImages(Long eventId, String userId, List<String> images) {
    var event = eventRepository.getEventById(eventId);

    if (event == null) {
      throw new NotFoundException("Event not found");
    }

    if (!event.getAuthorId().equals(userId)) {
      throw new ForbiddenException("Unable to edit event not created by current user");
    }

    final var set = new HashSet<>(images);

    imageService.deleteAllImages(set.stream().toList());

    event.getImages().removeAll(set);
  }

  @Override
  public ListOwnerEventResponse listMyEvents(String userId) {
    return new ListOwnerEventResponse(eventRepository
        .findByAuthorId(userId)
        .stream()
        .map((event) -> {
              var users = event
                  .getUsers()
                  .stream()
                  .map(user -> new UserResponse(
                      user.getEmail(),
                      user.getName(),
                      user.getSurname())
                  ).toList();
              return new OwnerEventResponse(
                  event.getId(),
                  event.getName(),
                  event.getPlace(),
                  event.getDescription(),
                  event.getStartAt(),
                  event.getNumberSeats(),
                  event.getAvailableSeats(),
                  event.getType(),
                  event.getImages(),
                  users);
            }
        ).toList());
  }
}
