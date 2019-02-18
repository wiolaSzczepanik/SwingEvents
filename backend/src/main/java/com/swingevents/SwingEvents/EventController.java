package com.swingevents.SwingEvents;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.file.Files;
import java.util.*;


@RestController
public class EventController {

    @RequestMapping("/events")
    public List<Event> seeAllEvents() throws Exception {
        List<Event> allEvents = readJSON();
        return allEvents;
    }


    @RequestMapping("events/tags")
    public Set<String> getAllTags(){
        Set<String> tags = new HashSet<>();
        try {
            List<Event> events = readJSON();
            for (Event event : events) {
                String[] eventTags = event.getTags();
                for (String tag:eventTags) {
                    tags.add(tag);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return tags;
    }

    private static List<Event> readJSON() throws Exception {
        File file = ResourceUtils.getFile("classpath:data/events.json");
        String content = new String(Files.readAllBytes(file.toPath()));

        List<Event>events = new ArrayList<>();
        JSONParser parser = new JSONParser();
        JSONArray jsonArray = (JSONArray) parser.parse(content);

        for (Object o : jsonArray) {
            JSONObject event = (JSONObject) o;

            String startDate = (String) event.get("startDate");
            String endDate = (String) event.get("endDate");
            String titleOfEvent = (String) event.get("titleOfEvent");
            String cityOfEvent = (String) event.get("cityOfEvent");

            List<String> tags = new ArrayList<>();

            JSONArray arrays = (JSONArray) event.get("tagList");
            for (Object object : arrays) {
                tags.add(object.toString());
            }

            String[] tagsArray = new String[tags.size()];
            tagsArray = tags.toArray(tagsArray);

            events.add(new Event(startDate, endDate, titleOfEvent, cityOfEvent, tagsArray));

        }
        return events;

    }
}



