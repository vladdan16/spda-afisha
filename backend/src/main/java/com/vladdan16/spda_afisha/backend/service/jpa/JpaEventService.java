package com.vladdan16.spda_afisha.backend.service.jpa;

import com.vladdan16.spda_afisha.backend.dto.responses.ListEventResponse;
import com.vladdan16.spda_afisha.backend.service.EventService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;


@Service
@Transactional
@RequiredArgsConstructor
public class JpaEventService implements EventService {

  @Override
  public void createEvent(String name, String type, OffsetDateTime startAt, Long numberSeats, String description) {
    // TODO: implement createEvent
  }

  @Override
  public ListEventResponse listEvents() {
    // TODO: implement listEvents
    return null;
  }

  // TODO: implement other methods
}
