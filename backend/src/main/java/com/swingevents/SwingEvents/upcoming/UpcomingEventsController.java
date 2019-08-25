package com.swingevents.SwingEvents.upcoming;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swingevents.SwingEvents.db.EventsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
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
        return eventsRepository.findUpcomingEventsIn(city, LocalDate.now(ZoneId.of("Europe/Warsaw")).minusDays(1))
                .stream().map(dbEvent -> UpcomingEvent.fromDbEvent(dbEvent, mapper))
                .collect(Collectors.toList());
    }

}
