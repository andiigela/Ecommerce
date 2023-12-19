package com.ubt.andi.ecommerceapi.controllers;
import com.ubt.andi.ecommerceapi.models.AppUser;
import com.ubt.andi.ecommerceapi.models.LoginForm;
import com.ubt.andi.ecommerceapi.services.UserService;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import java.security.Key;
import java.util.Collections;
import java.util.Date;

@RestController
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
//    private static final long EXPIRATION_TIME = 3600000; // 1 hour in milliseconds (adjust as needed)
//    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Replace with a strong and secure secret key
    public AuthController(UserService userService,AuthenticationManager authenticationManager,UserDetailsService userDetailsService){
        this.userService=userService;
        this.authenticationManager=authenticationManager;
        this.userDetailsService=userDetailsService;
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
    public ResponseEntity<?> login(@RequestBody LoginForm loginForm){
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUsername(),loginForm.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserDetails userDetails = userDetailsService.loadUserByUsername(loginForm.getUsername());
        if(userDetails != null){
//            String token = generateToken(userDetails.getUsername());
            return ResponseEntity.ok(Collections.singletonMap("accessToken", "tokenandi")); // Return token in response body
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");

    }
//    private String generateToken(String username) {
//        // Generate a JWT token with the username and expiration time
//        return Jwts.builder()
//                .setSubject(username)
//                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME)) // Define token expiration time
//                .signWith(SECRET_KEY) // Use a secret key to sign the token
//                .compact();
//    }

}
