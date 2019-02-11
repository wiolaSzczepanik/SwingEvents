package com.swingevents.SwingEvents;

import java.time.ZonedDateTime;

public class Event {

    private String date;
    private String titleOfEvent;
    private String cityOfEvent;

    public Event(String date, String titleOfEvent, String cityOfEvent) {
        this.date = date;
        this.titleOfEvent = titleOfEvent;
        this.cityOfEvent = cityOfEvent;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
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

    @Override
    public String toString() {
        return "Event{" +
                "date='" + date + '\'' +
                ", titleOfEvent='" + titleOfEvent + '\'' +
                ", cityOfEvent='" + cityOfEvent + '\'' +
                '}';
    }
}
