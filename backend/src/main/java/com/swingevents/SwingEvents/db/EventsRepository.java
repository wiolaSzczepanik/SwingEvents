package com.swingevents.SwingEvents.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventsRepository extends JpaRepository<DbEvent, Long> {
    List<DbEvent> findAll();

    @Query("select e from DbEvent e WHERE e.city = :city AND e.enddate > :from ORDER BY e.startdate")
    List<DbEvent> findUpcomingEventsIn(@Param("city") String city, @Param("from") LocalDate from);
}
