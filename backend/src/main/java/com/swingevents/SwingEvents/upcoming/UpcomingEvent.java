package com.swingevents.SwingEvents.upcoming;

import lombok.Builder;
import lombok.Data;

import java.util.Map;

@Data
@Builder
public class UpcomingEvent {
    private String id;
    private String startDate;
    private String endDate;
    private String title;
    private String city;
    private String link;
    private String image;
    private String description;
    private Map<String, String> facts;
}
