package com.ubt.andi.ecommerceapi.controllers;
//import com.ubt.andi.ecommerceapi.models.AppUser;
//import com.ubt.andi.ecommerceapi.services.UserService;
//import org.springframework.security.authentication.AuthenticationManager;
import com.ubt.andi.ecommerceapi.models.AppUser;
import com.ubt.andi.ecommerceapi.models.LoginForm;
import com.ubt.andi.ecommerceapi.services.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    public AuthController(UserService userService,AuthenticationManager authenticationManager){
        this.userService=userService;
        this.authenticationManager=authenticationManager;
    }
    @PostMapping("/test")
    public String test(@RequestBody String test){
        return test;
    }
    @PostMapping("/register")
    public AppUser createUser(@RequestBody AppUser user){
        this.userService.createUser(user);
        return user;
    }

    @PostMapping("/login")
    public AppUser login(@RequestBody LoginForm loginForm){
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUsername(),loginForm.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        AppUser user = userService.findUserByUsername(loginForm.getUsername());
        if(user != null){
            return user;
        }
        return null;
    }
}
