package com.swingevents.SwingEvents;

import com.swingevents.SwingEvents.db.DbEvent;
import com.swingevents.SwingEvents.db.EventsRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.QueryParam;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@Slf4j
public class EventController {

    @Autowired
    private EventsRepository eventsRepository;

    @RequestMapping("/events")
    public List<JsonEvent> seeAllEvents(@QueryParam("tag") String tag) throws Exception {

        log.info("[SPRING]--SEE ALL EVENTS");

        List<JsonEvent> allEvents = readAllEvents();

        if (tag == null) {
            return allEvents;
        }

        List<JsonEvent> selectedEvents = new ArrayList<>();

        for (JsonEvent event : allEvents) {
            if (event.getTags().contains(tag)) {
                selectedEvents.add(event);
            }
        }
        return selectedEvents;
    }


    @RequestMapping("events/tags")
    public Set<String> getAllTags() {

        log.info("[SPRING]--SEE ALL TAGS");

        Set<String> tags = new HashSet<>();
        try {
            List<JsonEvent> events = readAllEvents();
            for (JsonEvent event : events) {
                tags.addAll(event.getTags());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tags;
    }

    @RequestMapping("events/foregone")
    public List<JsonEvent> seeAllForegoneEvents() throws Exception {

        log.info("[SPRING]--SEE ALL FOREGONE EVENTS");


        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date todayDate = new Date();
        System.out.println("today: " + dateFormat.format(todayDate));

        List<JsonEvent> allForegoneEvents = new ArrayList<>();

        try {
            List<JsonEvent> events = readAllEvents();
            for (JsonEvent event : events) {
                log.info("eventStart: " + event.getEndDate());
                log.info("now: " + dateFormat.format(todayDate));
                Date eventDate = new SimpleDateFormat("yyyy-MM-dd").parse(event.getEndDate());
                if (todayDate.after(eventDate)) {
                    allForegoneEvents.add(event);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return allForegoneEvents;

    }

    private List<JsonEvent> readAllEvents() {
        return eventsRepository.findAll()
                .stream().map(DbEvent::toJsonEvent)
                .sorted(Comparator.comparing(JsonEvent::getStartDate))
                .collect(Collectors.toList());
    }
}



