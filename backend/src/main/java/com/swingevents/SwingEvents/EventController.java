package com.swingevents.SwingEvents;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.QueryParam;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@RestController
@Slf4j
public class EventController {

    @RequestMapping("/events")
    public List<Event> seeAllEvents(@QueryParam("tag") String tag) throws Exception {

        log.info("[SPRING]--SEE ALL EVENTS");

        List<Event> allEvents = readJSON();

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
                List<String> eventTags = event.getTags();
                tags.addAll(eventTags);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tags;
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

            events.add(new Event(startDate, endDate, titleOfEvent, cityOfEvent, facebookLink, image, tags));

        }
        return events;

    }
}



