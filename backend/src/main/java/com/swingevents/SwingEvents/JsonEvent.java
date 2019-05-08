package com.swingevents.SwingEvents;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class JsonEvent {
    private String startDate;
    private String endDate;
    private String titleOfEvent;
    private String cityOfEvent;
    private String facebookLink;
    private String image;
    private List<String> tags;
}
