package com.swingevents.SwingEvents.db;

import com.swingevents.SwingEvents.JsonEvent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table(name="events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DbEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String startdate;

    @Column
    private String enddate;

    @Column
    private String title;

    @Column
    private String city;

    @Column
    private String facebooklink;

    @Column
    private String image;

    @Column
    private String tags;

    public JsonEvent toJsonEvent() {
        return JsonEvent.builder()
                .startDate(startdate.split(" ")[0])
                .endDate(enddate.split(" ")[0])
                .titleOfEvent(title)
                .cityOfEvent(city)
                .facebookLink(facebooklink)
                .image(image)
                .tags(Arrays.asList(tags.split(",")))
                .build();
    }

    public static DbEvent fromJsonEvent(JsonEvent event) {
        DbEvent dbEvent = new DbEvent();
        dbEvent.startdate = event.getStartDate();
        dbEvent.enddate = event.getEndDate();
        dbEvent.facebooklink = event.getFacebookLink();
        dbEvent.image = event.getImage();
        dbEvent.title = event.getTitleOfEvent();
        dbEvent.city = event.getCityOfEvent();
        if (event.getTags() != null) {
            dbEvent.tags = String.join(",", event.getTags());
        }
        return dbEvent;
    }
}
