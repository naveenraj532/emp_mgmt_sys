package com.project.empmgtsys.service;

import com.project.empmgtsys.entity.Users;
import com.project.empmgtsys.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Users loginUser(String username, String password) {
        Optional<Users> optionalUser = Optional.ofNullable(userRepository.findByUsername(username));
        if (optionalUser.isPresent()) {
            Users user = optionalUser.get();
            String existingPassword = user.getPassword();
            if (password.equals(existingPassword)) {
                return user;
            }
        }
        return null;
    }

}
