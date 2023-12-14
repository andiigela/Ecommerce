package com.ubt.andi.ecommerceapi.controllers;

import com.ubt.andi.ecommerceapi.models.AppUser;
import com.ubt.andi.ecommerceapi.services.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:4200")
public class AuthController {
    private final UserService userService;
    public AuthController(UserService userService){
        this.userService=userService;
    }
    @PostMapping("/register")
    public AppUser createUser(@RequestBody AppUser user){
        this.userService.createUser(user);
        return user;
    }
}
