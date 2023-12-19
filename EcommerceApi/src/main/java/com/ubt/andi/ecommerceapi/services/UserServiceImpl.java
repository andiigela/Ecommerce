package com.ubt.andi.ecommerceapi.services;
import com.ubt.andi.ecommerceapi.models.AppUser;
import com.ubt.andi.ecommerceapi.repositories.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    public UserServiceImpl(UserRepository userRepository){
        this.userRepository=userRepository;
    }
    @Override
    public AppUser createUser(AppUser user) {
        if(user == null) return null;
        userRepository.save(user);
        return user;
    }
    @Override
    public AppUser findUserByUsername(String username) {
        if(username == null || username.trim().isEmpty()) return null;
        return userRepository.findByUsername(username);
    }
}
