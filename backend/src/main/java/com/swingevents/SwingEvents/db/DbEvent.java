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
}
