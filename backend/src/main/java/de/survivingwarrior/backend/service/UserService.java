package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.UserA;
import de.survivingwarrior.backend.model.UserDTO;
import de.survivingwarrior.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;
    private final GenerateUUID generateUUID;
    private final PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserA optionalUserUnSave = userRepo.findUserAByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with this username: " + username + " not found"));
        return new User(optionalUserUnSave.getUsername(), optionalUserUnSave.getPassword(), List.of());
    }

    public UserDTO registerUser(UserA userA) {
        String username = userA.getUsername();
        if(userRepo.findUserAByUsername(username).equals(userA.getUsername())){
            throw new IllegalArgumentException("Username already exist");
        }else{
        userA.setId(generateUUID.generateUUID());
        userA.setPassword(encoder.encode(userA.getPassword()));
        userRepo.insert(userA);
        }
        return new UserDTO(userA.getId(), userA.getUsername());
    }

}
