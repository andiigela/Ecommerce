package com.ubt.andi.ecommerceapi.controllers;
import com.ubt.andi.ecommerceapi.dto.AuthResponseDto;
import com.ubt.andi.ecommerceapi.models.AppUser;
import com.ubt.andi.ecommerceapi.models.LoginForm;
import com.ubt.andi.ecommerceapi.security.JwtGenerator;
import com.ubt.andi.ecommerceapi.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtGenerator jwtGenerator;
    public AuthController(UserService userService, AuthenticationManager authenticationManager, JwtGenerator jwtGenerator
                          ){
        this.userService=userService;
        this.authenticationManager=authenticationManager;
        this.jwtGenerator=jwtGenerator;
    }
    @GetMapping("/test")
    public String test(){
        return "Hey";
    }
    @PostMapping("/register")
    public AppUser createUser(@RequestBody AppUser user){
        this.userService.createUser(user);
        return user;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDto> login(@RequestBody LoginForm loginForm){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUsername(),loginForm.getPassword())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtGenerator.generateToken(authentication);
        AuthResponseDto authResponseDto = new AuthResponseDto(token);
        authResponseDto.setUserName(loginForm.getUsername());
        return new ResponseEntity<>(authResponseDto, HttpStatus.OK);
    }

}
