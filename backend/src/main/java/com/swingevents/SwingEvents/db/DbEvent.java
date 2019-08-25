package com.swingevents.SwingEvents.db;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.swingevents.SwingEvents.JsonEvent;
import com.swingevents.SwingEvents.upcoming.EventStatus;
import com.swingevents.SwingEvents.upcoming.UpcomingEvent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;

@Slf4j
@Entity
@Table(name="events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DbEvent {

    @Id
    @SequenceGenerator(name="events_id_seq", sequenceName="events_id_seq", allocationSize=1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="events_id_seq")
    @Column(name = "id", updatable=false)
    private Long id;

    @Column
    private LocalDate startdate;

    @Column
    private LocalDate enddate;

    @Column
    private String title;

    @Column
    private String description;

    @Column
    private String facts;

    @Column
    private String city;

    @Column
    private String facebooklink;

    @Column
    private String image;

    @Column
    private String tags;

    @Column
    private String status;

    public JsonEvent toJsonEvent() {
        return JsonEvent.builder()
                .startDate(startdate.format(DateTimeFormatter.ISO_DATE))
                .endDate(enddate.format(DateTimeFormatter.ISO_DATE))
                .titleOfEvent(title)
                .cityOfEvent(city)
                .facebookLink(facebooklink)
                .image(image)
                .tags(Arrays.asList(tags.split(",")))
                .build();
    }

    public static DbEvent fromJsonEvent(JsonEvent event, ObjectMapper mapper) {
        DbEvent dbEvent = new DbEvent();
        dbEvent.startdate = LocalDate.parse(event.getStartDate());
        dbEvent.enddate = LocalDate.parse(event.getEndDate());
        dbEvent.facebooklink = event.getFacebookLink();
        dbEvent.image = event.getImage();
        dbEvent.title = event.getTitleOfEvent();
        dbEvent.city = event.getCityOfEvent();
        dbEvent.description = event.getDescription();
        dbEvent.status = EventStatus.CONFIRMED.toString();
        try {
            dbEvent.facts = mapper.writeValueAsString(event.getFacts());
        } catch (JsonProcessingException e) {
            dbEvent.facts = "{}";
            log.error("Problem with JSON serialization", e);
        }
        if (event.getTags() != null) {
            dbEvent.tags = String.join(",", event.getTags());
        }
        return dbEvent;
    }

    public UpcomingEvent toUpcomingEvent() {
        return UpcomingEvent.builder()
                .startDate(startdate.format(DateTimeFormatter.ISO_DATE))
                .endDate(enddate.format(DateTimeFormatter.ISO_DATE))
                .title(title)
                .city(city)
                .link(facebooklink)
                .image(image)
                .build();
    }

    public static DbEvent fromUpcomingEvent(UpcomingEvent event, ObjectMapper mapper) {
        DbEvent dbEvent = new DbEvent();
        dbEvent.startdate = LocalDate.parse(event.getStartDate());
        dbEvent.enddate = LocalDate.parse(event.getEndDate());
        dbEvent.facebooklink = event.getLink();
        dbEvent.image = event.getImage();
        dbEvent.title = event.getTitle();
        dbEvent.city = event.getCity();
        dbEvent.description = event.getDescription();
        dbEvent.status = EventStatus.CONFIRMED.toString();
        try {
            dbEvent.facts = mapper.writeValueAsString(event.getFacts());
        } catch (JsonProcessingException e) {
            dbEvent.facts = "{}";
            log.error("Problem with JSON serialization", e);
        }
//        if (event.getTags() != null) {
//            dbEvent.tags = String.join(",", event.getTags());
//        }
        return dbEvent;
    }
}
