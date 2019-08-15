package com.swingevents.SwingEvents.upcoming;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swingevents.SwingEvents.db.DbEvent;
import com.swingevents.SwingEvents.db.EventsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class UpcomingEventsController {

    @Autowired
    private ObjectMapper mapper;

    @Autowired
    private EventsRepository eventsRepository;

    @RequestMapping("/upcoming")
    public List<UpcomingEvent> upcomingEventsIn(@RequestParam("city") String city) throws Exception {
        return eventsRepository.findUpcomingEventsIn(city, LocalDate.now(ZoneId.of("Europe/Warsaw")))
                .stream().map(this::toUpcomingEvent)
                .collect(Collectors.toList());
    }

    private UpcomingEvent toUpcomingEvent(DbEvent dbEvent) {
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
                .build();
    }
}
