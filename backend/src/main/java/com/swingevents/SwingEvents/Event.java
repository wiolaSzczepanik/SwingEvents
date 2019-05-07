package com.swingevents.SwingEvents;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name="events")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "startdate")
    private String startDate;

    @Column(name = "enddate")
    private String endDate;

    @Column(name = "title")
    private String titleOfEvent;

    @Column(name = "city")
    private String cityOfEvent;

    @Column(name = "facebooklink")
    private String facebookLink;

    @Column(name = "image")
    private String image;

    @Column(name = "tags")
    private String tags;
}
