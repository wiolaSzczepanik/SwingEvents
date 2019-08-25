package com.swingevents.SwingEvents.upcoming;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swingevents.SwingEvents.db.DbEvent;
import lombok.Builder;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Data
@Builder
public class UpcomingEvent {
    private String id;
    private String startDate;
    private String endDate;
    private String title;
    private String city;
    private String link;
    private String image;
    private String description;
    private EventStatus status;
    private Map<String, String> facts;

    public static UpcomingEvent fromDbEvent(DbEvent dbEvent, ObjectMapper mapper) {
        Map<String, String> facts = new HashMap<>();
        if(dbEvent.getFacts() != null) {
            try {
                facts = mapper.readValue(dbEvent.getFacts(), Map.class);
            } catch (IOException e) {
                log.error("Could not decode JSON facts for event {}: ", dbEvent.getId(), e);
            }
        }

        return UpcomingEvent.builder()
                .id(String.valueOf(dbEvent.getId()))
                .startDate(dbEvent.getStartdate().format(DateTimeFormatter.ISO_DATE))
                .endDate(dbEvent.getEnddate().format(DateTimeFormatter.ISO_DATE))
                .city(dbEvent.getCity())
                .image(dbEvent.getImage())
                .link(dbEvent.getFacebooklink())
                .title(dbEvent.getTitle())
                .description(dbEvent.getDescription())
                .facts(facts)
                .status(EventStatus.valueOf(dbEvent.getStatus()))
                .build();
    }
}
