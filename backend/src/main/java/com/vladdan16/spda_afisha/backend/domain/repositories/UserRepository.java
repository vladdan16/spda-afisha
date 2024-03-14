package com.vladdan16.spda_afisha.backend.domain.repositories;

import com.vladdan16.spda_afisha.backend.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories
public interface UserRepository extends JpaRepository<User, Long> {
}
