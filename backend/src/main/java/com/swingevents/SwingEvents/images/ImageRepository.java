package com.swingevents.SwingEvents.images;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ImageRepository extends JpaRepository<EventImages, Integer> {
}
