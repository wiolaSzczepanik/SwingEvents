package com.swingevents.SwingEvents.auth;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/auth")
public class UserController {

    @RequestMapping("/user")
    public User showUserInfo(Authentication authentication, HttpServletRequest request) throws Exception {
        return new User(authentication.getName(), request.isUserInRole("ROLE_ADMIN"));
    }
}
