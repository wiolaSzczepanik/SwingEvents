package com.swingevents.SwingEvents.users;


import com.swingevents.SwingEvents.JsonEvent;
import com.swingevents.SwingEvents.db.DbEvent;
import com.swingevents.SwingEvents.db.EventsRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.ws.rs.QueryParam;
import java.security.Principal;
import java.sql.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
@RequestMapping("/users")
public class UserEventsController {

    @Autowired
    private EventsRepository eventsRepository;

    @RequestMapping("/id")
    public long getUserID(Principal principal) {
        log.info("returning user ID for {}", principal.getName());
        long user_role_id = 0;
        String SQL_SELECT_USER_ID = "select * from user_roles where username = '" + principal.getName() + "'";

        try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/events", "postgres", "docker");
             PreparedStatement preparedStatement = conn.prepareStatement(SQL_SELECT_USER_ID)) {

            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                user_role_id = resultSet.getLong("user_role_id");

            }
        } catch (SQLException e) {
            e.printStackTrace();
        }

        return user_role_id;
    }

    @RequestMapping("/events")
    public List<JsonEvent> showUserEvents(Principal principal, @QueryParam("tag") String tag) throws Exception {
        log.info("returning events for {}", principal.getName());

        long userId = getUserID(principal);

        String SQL_SELECT_USER_EVENTS = " select * from events inner join users_events on events.id = users_events.id_event where users_events.id_user = " + userId + ";";
        List<JsonEvent> userEvents = new ArrayList<>();
        try (Connection conn = DriverManager.getConnection(
                "jdbc:postgresql://localhost:5432/events", "postgres", "docker");
             PreparedStatement preparedStatement = conn.prepareStatement(SQL_SELECT_USER_EVENTS)) {

            ResultSet resultSet = preparedStatement.executeQuery();
            while (resultSet.next()) {
                long id = resultSet.getLong("ID");
                String startdate =resultSet.getString("STARTDATE");
                String enddate =resultSet.getString("ENDDATE");
                String title = resultSet.getString("TITLE");
                String city = resultSet.getString("CITY");
                String facebooklink = resultSet.getString("FACEBOOKLINK");
                String image = resultSet.getString("IMAGE");
                String tags = resultSet.getString("TAGS");

                DbEvent event = new DbEvent();
                event.setId(id);
                event.setStartdate(startdate);
                event.setEnddate(enddate);
                event.setTitle(title);
                event.setCity(city);
                event.setFacebooklink(facebooklink);
                event.setImage(image);
                event.setTags(tags);

                userEvents.add(event.toJsonEvent());
            }

        }
        return userEvents;
    }

    private List<JsonEvent> readAllEvents() {
        return eventsRepository.findAll()
                .stream().map(DbEvent::toJsonEvent)
                .sorted(Comparator.comparing(JsonEvent::getStartDate))
                .collect(Collectors.toList());
    }

}
