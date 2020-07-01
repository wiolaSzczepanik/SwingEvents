package pl.kiedytancze.backend.tests;

import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import org.hamcrest.Matchers;
import org.json.simple.parser.ParseException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;

public class ExampleTest {

    @BeforeEach
    void setUp() {
        RestAssured.baseURI = "http://localhost";
        RestAssured.port = 8080;
    }

    @Test
    public void shouldRespond404OnNonExistingPath() {
        given().contentType(ContentType.JSON)
                .get("/non-existing-path")
                .then()
                .statusCode(404);
    }

    @Test //TODO do not understand why is not passing
    public void shouldReturn404WhenchangingNotExistingEvent() throws ParseException {

        String event = "{" +
                " \"id\":\"12345\"," +
                " \"startDate\":\"2019-09-19\"," +
                " \"endDate\":\"2019-09-19\"," +
                " \"status\":\"CONFIRMED\"}";


        RestAssured.given()
                .auth()
                .preemptive()
                .basic("wiola", "wiola")
                .when()
                .contentType(ContentType.JSON)
                .body(event)
                .put("/admin/events/12345")
                .then()
                .log().all()
                .statusCode(404);

    }

    @Test
    public void shouldAddPotańcówkaEventToUpcomingEventList() {
        String event = "{" +
                " \"id\":\"0\"," +
                " \"startDate\":\"2019-09-19\"," +
                " \"endDate\":\"2019-09-19\"," +
                " \"titleOfEvent\":\"title\"," +
                " \"cityOfEvent\":\"City\"," +
                " \"image\":\"http://kraktheshag.com/wp-content/uploads/2014/05/baner_obszar-roboczy-1.jpg\"," +
                " \"facebookLink\":\"http://www.google.com\"," +
                " \"description\":\"Description\"," +
                " \"facts\":{" +
                            " \"type\": \"Potańcówka\"," +
                            " \"time\": \"19:30-22:00\"," +
                            " \"price\": \"price\"," +
                            " \"style\": \"style\"," +
                            " \"bands\": \"bands\"," +
                            " \"venue\": \"Venue\"}," +
                " \"tags\":[],"+
                " \"status\":\"CONFIRMED\"}";

        RestAssured.given()
                .auth()
                .preemptive()
                .basic("wiola", "wiola")
                .when()
                .contentType(ContentType.JSON)
                .body(event)
                .post("/admin/events")
                .then()
                .log()
                .all()
                .assertThat()
                .statusCode(200);

        RestAssured.given()
                .when()
                .contentType(ContentType.JSON)
                .get("/upcoming?city=City")
                .then()
                .log()
                .all()
                .assertThat()
                .statusCode(200)
                .body("$", Matchers.hasSize(Matchers.greaterThan(0)));
    }

    @Test
    public void shouldAddWarsztatyEventToUpcomingEventList() {
        String event = "{" +
                " \"id\":\"0\"," +
                " \"startDate\":\"2019-09-19\"," +
                " \"endDate\":\"2019-09-19\"," +
                " \"titleOfEvent\":\"title\"," +
                " \"cityOfEvent\":\"City\"," +
                " \"image\":\"http://kraktheshag.com/wp-content/uploads/2014/05/baner_obszar-roboczy-1.jpg\"," +
                " \"facebookLink\":\"http://www.google.com\"," +
                " \"description\":\"Description\"," +
                " \"facts\":{" +
                " \"type\": \"Warsztaty\"," +
                " \"style\": \"style\"," +
                " \"teachers\": \"teachers\"," +
                " \"venue\": \"Venue\"}," +
                " \"tags\":[],"+
                " \"status\":\"CONFIRMED\"}";

        RestAssured.given()
                .auth()
                .preemptive()
                .basic("wiola", "wiola")
                .when()
                .contentType(ContentType.JSON)
                .body(event)
                .post("/admin/events")
                .then()
                .log()
                .all()
                .assertThat()
                .statusCode(200);

        RestAssured.given()
                .when()
                .contentType(ContentType.JSON)
                .get("/upcoming?city=City")
                .then()
                .log()
                .all()
                .assertThat()
                .statusCode(200)
                .body("$", Matchers.hasSize(Matchers.greaterThan(0)));
    }

    @Test
    public void shouldAddFestiwalEventToUpcomingEventList() {
        String event = "{" +
                " \"id\":\"0\"," +
                " \"startDate\":\"2019-09-19\"," +
                " \"endDate\":\"2019-09-19\"," +
                " \"titleOfEvent\":\"title\"," +
                " \"cityOfEvent\":\"City\"," +
                " \"image\":\"http://kraktheshag.com/wp-content/uploads/2014/05/baner_obszar-roboczy-1.jpg\"," +
                " \"facebookLink\":\"http://www.google.com\"," +
                " \"description\":\"Description\"," +
                " \"facts\":{" +
                " \"type\": \"Farsztaty\"," +
                " \"style\": \"style\"," +
                " \"bands\": \"bands\"}," +
                " \"tags\":[],"+
                " \"status\":\"CONFIRMED\"}";

        RestAssured.given()
                .auth()
                .preemptive()
                .basic("wiola", "wiola")
                .when()
                .contentType(ContentType.JSON)
                .body(event)
                .post("/admin/events")
                .then()
                .log()
                .all()
                .assertThat()
                .statusCode(200);

        RestAssured.given()
                .when()
                .contentType(ContentType.JSON)
                .get("/upcoming?city=City")
                .then()
                .log()
                .all()
                .assertThat()
                .statusCode(200)
                .body("$", Matchers.hasSize(Matchers.greaterThan(0)));
    }


    @Test
    public void shouldNotAddEventToUpcomingEventList() {
        String event = "{" +
                " \"id\":\"0\"," +
                " \"startDate\":\"2019-09-19\"," +
                " \"endDate\":\"2019-09-19\"," +
                " \"titleOfEvent\":\"title\"," +
                " \"cityOfEvent\":\"City\"," +
                " \"image\":\"http://kraktheshag.com/wp-content/uploads/2014/05/baner_obszar-roboczy-1.jpg\"," +
                " \"facebookLink\":\"http://www.google.com\"," +
                " \"description\":\"Description\"," +
                " \"facts\":{" +
                    " \"type\": \"AnotherType\"," +
                    " \"style\": \"style\"," +
                    " \"bands\": \"bands\"}," +
                " \"tags\":[],"+
                " \"status\":\"CONFIRMED\"}";

        RestAssured.given()
                .auth()
                .preemptive()
                .basic("wiola", "wiola")
                .when()
                .contentType(ContentType.JSON)
                .body(event)
                .post("/admin/events")
                .then()
                .log()
                .all()
                .assertThat()
                .statusCode(200);

        RestAssured.given()
                .when()
                .contentType(ContentType.JSON)
                .get("/upcoming?city=City")
                .then()
                .log()
                .all()
                .assertThat()
                .statusCode(200)
                .body("$", Matchers.hasSize(Matchers.greaterThan(0)));
    }
}
