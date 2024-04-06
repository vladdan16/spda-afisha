package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.domain.exceptions.NotAcceptableException;
import com.vladdan16.spda_afisha.backend.domain.exceptions.NotFoundException;
import com.vladdan16.spda_afisha.backend.domain.repositories.EventRepository;
import com.vladdan16.spda_afisha.backend.domain.repositories.UserRepository;
import com.vladdan16.spda_afisha.backend.dto.responses.enrolls.ListEnrollResponse;
import com.vladdan16.spda_afisha.backend.dto.responses.events.EventResponse;
import com.vladdan16.spda_afisha.backend.service.EnrollService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@Transactional
@RequiredArgsConstructor
public class JpaEnrollService implements EnrollService {
  private final EventRepository eventRepository;
  private final UserRepository userRepository;

  @Override
  public void createEnroll(String userId, Long eventId) {
    var event = eventRepository.getEventById(eventId);
    if (event == null) {
      throw new NotFoundException("Event not found", null);
    }
    var user = userRepository.getUserById(userId);
    if (user == null) {
      throw new NotFoundException("User not found", null);
    }

    if (user.getEvents().contains(event) || event.getUsers().contains(user)) {
      throw new NotAcceptableException("Enroll already exists", null);
    }
    user.getEvents().add(event);
    event.getUsers().add(user);
  }

  @Override
  public void deleteEnroll(String userId, Long eventId) {
    var event = eventRepository.getEventById(eventId);
    if (event == null) {
      throw new NotFoundException("Event not found", null);
    }
    var user = userRepository.getUserById(userId);
    if (user == null) {
      throw new NotFoundException("User not found", null);
    }
    if (!user.getEvents().contains(event) || !event.getUsers().contains(user)) {
      throw new NotAcceptableException("Enroll does not exist", null);
    }
    user.getEvents().remove(event);
    event.getUsers().remove(user);
  }

  @Override
  public ListEnrollResponse getEnrollsByUser(String userId) {
    var user = userRepository.getUserById(userId);
    if (user == null) {
      throw new NotFoundException("User not found", null);
    }

    return new ListEnrollResponse(
        user.getEvents()
            .stream()
            .map(event -> new EventResponse(
                event.getId(),
                event.getName(),
                event.getDescription(),
                event.getStartAt(),
                event.getNumberSeats(),
                event.getType()
            ))
            .toList());
  }
}
