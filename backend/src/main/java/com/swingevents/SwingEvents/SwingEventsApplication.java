package com.swingevents.SwingEvents;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@Slf4j
public class SwingEventsApplication {

  	@Bean
    public WebMvcConfigurer corsConfigurer() {
        log.info("[SPRING]-- START APPLICATION");
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

