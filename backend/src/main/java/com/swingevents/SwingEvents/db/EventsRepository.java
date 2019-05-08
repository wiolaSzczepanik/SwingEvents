package com.swingevents.SwingEvents.db;

import com.swingevents.SwingEvents.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventsRepository extends JpaRepository<Event, Long> {
    List<Event> findAll();
}
