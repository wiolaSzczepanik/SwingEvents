package com.swingevents.SwingEvents.users;


import com.swingevents.SwingEvents.JsonEvent;
import com.swingevents.SwingEvents.db.DbEvent;
import com.swingevents.SwingEvents.db.EventsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.QueryParam;
import java.security.Principal;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/users")
public class UserEventsController {

    @Autowired
    private EventsRepository eventsRepository;

    @RequestMapping("/events")
    public List<JsonEvent> showUserEvents(Principal principal, @QueryParam("tag") String tag) throws Exception {
        log.info("returning events for {}", principal.getName());
        return readAllEvents();
    }

    private List<JsonEvent> readAllEvents() {
        return eventsRepository.findAll()
                .stream().map(DbEvent::toJsonEvent)
                .sorted(Comparator.comparing(JsonEvent::getStartDate))
                .collect(Collectors.toList());
    }

}
