package com.swingevents.SwingEvents;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;


@RestController
public class EventController {

    @RequestMapping("/events")
    public List<Event> seeAllEvents() throws IOException, ParseException {
        List<Event> allEvents = new ArrayList<>();

        JSONArray readEvents = readJSON();
        allEvents.addAll(readEvents);
        return allEvents;
    }

    private static JSONArray readJSON() throws IOException, ParseException {
        InputStream resource = new ClassPathResource(
                "data/events.json").getInputStream();
        JSONParser jsonParser = new JSONParser();
        Object jsonObject = jsonParser.parse(
                new InputStreamReader(resource, StandardCharsets.UTF_8));
        return (JSONArray) jsonObject;

    }
}



