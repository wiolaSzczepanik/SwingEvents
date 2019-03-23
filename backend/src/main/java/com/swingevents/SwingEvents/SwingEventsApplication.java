package com.swingevents.SwingEvents;

import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SwingEventsApplication {

    public static Logger LOGGER = LoggerFactory.getLogger(Slf4j.class);

	@Bean
    public WebMvcConfigurer corsConfigurer() {
	    LOGGER.info("[SPRING]-- START APPLICATION");
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:4100");
            }
        };
    }

	public static void main(String[] args) {
		SpringApplication.run(SwingEventsApplication.class, args);
	}

}

