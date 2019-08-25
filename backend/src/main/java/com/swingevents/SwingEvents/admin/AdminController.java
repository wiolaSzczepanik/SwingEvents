package com.swingevents.SwingEvents.admin;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.swingevents.SwingEvents.images.ImageFetchingService;
import com.swingevents.SwingEvents.upcoming.UpcomingEvent;
import lombok.extern.slf4j.Slf4j;

import com.swingevents.SwingEvents.JsonEvent;
import com.swingevents.SwingEvents.db.DbEvent;
import com.swingevents.SwingEvents.db.EventsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

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
    public JsonEvent addEvent(@RequestBody JsonEvent event) throws Exception {
        log.info(event.toString());
        DbEvent addedEvent = eventsRepository.save(DbEvent.fromJsonEvent(event, mapper));

        imageFetchingService.uploadImage(addedEvent.getId().intValue(), event.getImage());

        return addedEvent.toJsonEvent();
    }

    @RequestMapping(value = "/events/{id}",method = RequestMethod.PUT)
    public void editAdminEvent(@PathVariable("id") Long id, @RequestBody UpcomingEvent event){
        log.info("Edit event: id: {}, title: {}", id, event.getTitle());

        DbEvent dbEvent = DbEvent.fromUpcomingEvent(event, mapper);
        dbEvent.setId(id);

        DbEvent updatedEvent = eventsRepository.save(dbEvent);

        updatedEvent.toUpcomingEvent();
    }

//    @RequestMapping(value = "/events/{id}",method = RequestMethod.POST)
//    public void postAdminEvent(@PathVariable("id") Long id, @RequestBody UpcomingEvent event) {
//        DbEvent dbEvent = DbEvent.fromUpcomingEvent(event, mapper);
//
//    }

}
