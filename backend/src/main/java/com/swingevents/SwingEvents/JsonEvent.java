package com.swingevents.SwingEvents;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Builder
@Data
public class JsonEvent {
    private String startDate;
    private String endDate;
    private String titleOfEvent;
    private String cityOfEvent;
    private String facebookLink;
    private String image;
    private String status;
    private String description;
    private Map<String, String> facts;
    private List<String> tags;
}
