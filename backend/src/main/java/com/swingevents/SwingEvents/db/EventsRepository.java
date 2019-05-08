package com.swingevents.SwingEvents.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventsRepository extends JpaRepository<DbEvent, Long> {
    List<DbEvent> findAll();
}
