package com.swingevents.SwingEvents.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swingevents.SwingEvents.JsonEvent;
import com.swingevents.SwingEvents.db.DbEvent;
import com.swingevents.SwingEvents.db.EventsRepository;
import com.swingevents.SwingEvents.images.ImageFetchingService;
import com.swingevents.SwingEvents.upcoming.EventStatus;
import com.swingevents.SwingEvents.upcoming.UpcomingEvent;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@Slf4j
@Secured("ROLE_ADMIN")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private EventsRepository eventsRepository;

    @Autowired
    private ImageFetchingService imageFetchingService;

    @Autowired
    private ObjectMapper mapper;

    @RequestMapping("/events")
    public ResponseEntity<JsonEvent> addEvent(@RequestBody JsonEvent event) throws Exception {
        log.info(event.toString());
        if (event.getFacts().get("type").equals(EventType.Potańcówka.toString())) {
            if (event.getFacts().containsKey("venue") &&
                    event.getFacts().containsKey("price") &&
                    event.getFacts().containsKey("bands") &&
                    event.getFacts().containsKey("time") &&
                    event.getFacts().containsKey("style")) {
                DbEvent addedEvent = getDbEvent(event);
                return ResponseEntity.status(HttpStatus.OK).body(addedEvent.toJsonEvent());
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }

        if (event.getFacts().get("type").equals(EventType.Warsztaty.toString())) {
            if (event.getFacts().containsKey("teachers") &&
                    event.getFacts().containsKey("style")) {
                DbEvent addedEvent = getDbEvent(event);
                return ResponseEntity.status(HttpStatus.OK).body(addedEvent.toJsonEvent());
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
            }
        }

        DbEvent addedEvent = getDbEvent(event);
        return ResponseEntity.status(HttpStatus.OK).body(addedEvent.toJsonEvent());

    }

    private DbEvent getDbEvent(@RequestBody JsonEvent event) throws Exception {
        DbEvent addedEvent = eventsRepository.save(DbEvent.fromJsonEvent(event, mapper));
        imageFetchingService.uploadImage(addedEvent.getId().intValue(), event.getImage());
        return addedEvent;
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.GET)
    public UpcomingEvent getSingleEvent(@PathVariable("id") Long id) {
        DbEvent dbEvent = eventsRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        return UpcomingEvent.fromDbEvent(dbEvent, mapper);
    }

    @RequestMapping(value = "/events/{id}", method = RequestMethod.PUT)
    public void editAdminEvent(@PathVariable("id") Long id, @RequestBody UpcomingEvent event) {
        log.info("Edit event: id: {}, title: {}", id, event.getTitle());

        DbEvent dbEvent = DbEvent.fromUpcomingEvent(event, mapper);
        dbEvent.setId(id);

        eventsRepository.save(dbEvent);
    }

    //not delete event from db - only change status event to 'deleted'
    @RequestMapping(value = "events/{id}", method = RequestMethod.DELETE)
    public void changeEventStatusToDelete(@PathVariable("id") Long id) {
        log.info("Event status with id: {} was change to DELETED", id);

        Optional<DbEvent> maybeEvent = eventsRepository.findById(id);
        DbEvent dbEvent = maybeEvent.get();

        dbEvent.setStatus(EventStatus.DELETED.toString());
        eventsRepository.save(dbEvent);
    }
}
