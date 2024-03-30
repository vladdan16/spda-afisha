package com.vladdan16.spda_afisha.backend.service.jpa;

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
    var event = eventRepository.getReferenceById(eventId);
    var user = userRepository.getUserById(userId);
    // TODO: add check that user not in event
    user.getEvents().add(event);
    event.getUsers().add(user);
  }

  @Override
  public void deleteEnroll(String userId, Long eventId) {
    var event = eventRepository.getReferenceById(eventId);
    var user = userRepository.getUserById(userId);
    //TODO: add check that user in event
    user.getEvents().remove(event);
    event.getUsers().remove(user);
  }

  @Override
  public ListEnrollResponse getEnrollsByUser(String userId) {
    var user = userRepository.getUserById(userId);

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
