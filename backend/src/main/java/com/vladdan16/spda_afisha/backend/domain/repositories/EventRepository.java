package com.vladdan16.spda_afisha.backend.domain.repositories;

import com.vladdan16.spda_afisha.backend.domain.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
}
