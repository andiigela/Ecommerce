package com.ubt.andi.ecommerceapi.security;
import com.ubt.andi.ecommerceapi.models.AppUser;
import com.ubt.andi.ecommerceapi.services.UserService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UserService userService;
    public UserDetailsServiceImpl(UserService userService){
        this.userService=userService;
    }
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser userDb = userService.findUserByUsername(username);
        if(userDb == null) throw new UsernameNotFoundException("User not found with username: " + username);
        UserDetails authUser = new User(userDb.getUsername(),userDb.getPassword(), Arrays.asList(new SimpleGrantedAuthority("ROLE_User")));
        return authUser;
    }
}
