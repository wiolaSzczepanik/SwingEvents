package com.swingevents.SwingEvents;

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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.*;
import java.util.stream.Collectors;


@RestController
@Slf4j
public class EventController {

    @Autowired
    private EventsRepository eventsRepository;

    @RequestMapping("/events")
    public List<Event> seeAllEvents(@QueryParam("tag") String tag) throws Exception {

        log.info("[SPRING]--SEE ALL EVENTS");

        List<Event> allEvents = eventsRepository.findAll();

        if(tag==null){
            return allEvents;
        }

        List<Event>selectedEvents =  new ArrayList<>();

        for (Event event : allEvents) {
            if(event.getTags().contains(tag)){
                selectedEvents.add(event);
            }
        }
        return selectedEvents;
    }


    @RequestMapping("events/tags")
    public Set<String> getAllTags(){
        Set<String> tags = new HashSet<>();
        try {
            List<Event> events = readJSON();
            for (Event event : events) {
                List<String> eventTags = Arrays.asList(event.getTags().split(","));
                tags.addAll(eventTags);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tags;
    }

    @RequestMapping("events/foregone")
    public List<Event>seeAllForegoneEvents() throws Exception {
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date todayDate = new Date();
        System.out.println("today: " + dateFormat.format(todayDate));

        List<Event> allForegoneEvents = new ArrayList<>();

        try{
            List<Event> events = readJSON();
            for (Event event : events){
                log.info("eventStart: " + event.getEndDate());
                log.info("now: " + dateFormat.format(todayDate));
                Date eventDate = new SimpleDateFormat("yyyy-MM-dd").parse(event.getEndDate());
                if(todayDate.after(eventDate)){
                    allForegoneEvents.add(event);
                }
            }
        }catch (Exception e) {
            e.printStackTrace();
        }
        return allForegoneEvents;

    }

    private static List<Event> readJSON() throws Exception {
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        InputStream inputStream = classloader.getResourceAsStream("data/events.json");
        String content = IOUtils.toString(inputStream, StandardCharsets.UTF_8);


        List<Event>events = new ArrayList<>();
        JSONParser parser = new JSONParser();
        JSONArray jsonArray = (JSONArray) parser.parse(content);

        for (Object o : jsonArray) {
            JSONObject event = (JSONObject) o;

            String startDate = (String) event.get("startDate");
            String endDate = (String) event.get("endDate");
            String titleOfEvent = (String) event.get("titleOfEvent");
            String cityOfEvent = (String) event.get("cityOfEvent");
            String facebookLink = (String) event.get("facebookLink");
            String image = (String) event.get("image");

            List<String> tags = new ArrayList<>();

            JSONArray arrays = (JSONArray) event.get("tagList");

            for (Object tag : arrays) {
                tags.add(tag.toString());
            }

            events.add(new Event(0, startDate, endDate, titleOfEvent, cityOfEvent, facebookLink, image, String.join(",", tags)));

        }
        return events;

    }
}



