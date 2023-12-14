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
}
