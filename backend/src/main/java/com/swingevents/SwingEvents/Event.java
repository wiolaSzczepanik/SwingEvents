package com.swingevents.SwingEvents;

import org.json.simple.JSONArray;

public class Event {

    private String startDate;
    private String endDate;
    private String titleOfEvent;
    private String cityOfEvent;
    private String[] tags;

    public Event(String startDate, String endDate, String titleOfEvent, String cityOfEvent, String[] tags) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.titleOfEvent = titleOfEvent;
        this.cityOfEvent = cityOfEvent;
        this.tags = tags;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTitleOfEvent() {
        return titleOfEvent;
    }

    public void setTitleOfEvent(String titleOfEvent) {
        this.titleOfEvent = titleOfEvent;
    }

    public String getCityOfEvent() {
        return cityOfEvent;
    }

    public void setCityOfEvent(String cityOfEvent) {
        this.cityOfEvent = cityOfEvent;
    }

    public String[] getTags() {
        return tags;
    }

    public void setTags(String[] tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return "Event{" +
                "startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", titleOfEvent='" + titleOfEvent + '\'' +
                ", cityOfEvent='" + cityOfEvent + '\'' +
                ", tags='" + tags + '\'' +

                '}';
    }
}
