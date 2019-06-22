package com.swingevents.SwingEvents.auth;

import lombok.extern.slf4j.Slf4j;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@Slf4j
@RequestMapping("/auth")
public class UserController {

    @RequestMapping("/user")
    public User showUserInfo(Principal principal) throws Exception {
        return new User(principal.getName());
    }
}
