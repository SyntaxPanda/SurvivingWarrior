package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Achievement;
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

import java.util.ArrayList;
import java.util.List;

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
        List<Achievement> achievements = new ArrayList<>(List.of(
                new Achievement("1", "Level 5", "You reached level 5 with ur character!", false),
                new Achievement("2", "Level 10", "You reached level 10 with ur character!", false),
                new Achievement("3", "Level 15", "You reached level 15 with ur character!", false),
                new Achievement("4", "Level 20", "You reached level 20 with ur character!", false),
                new Achievement("5", "100 Gold", "Current Gold 100", false),
                new Achievement("6", "150 Gold", "Current Gold 150", false),
                new Achievement("7", "200 Gold", "Current Gold 200", false),
                new Achievement("8", "250 Gold", "Current Gold 250", false),
                new Achievement("9", "1 Game", "Start 1 Game", false),
                new Achievement("10", "5 Game", "Start 5 Game", false),
                new Achievement("11", "10 Game", "Start 10 Game", false),
                new Achievement("12", "25 Game", "Start 25 Game", false),
                new Achievement("13", "1 Dragon", "Kill 1 Dragon", false),
                new Achievement("14", "5 Dragon", "Kill 5 Dragon", false),
                new Achievement("15", "10 Dragon", "Kill 10 Dragon", false),
                new Achievement("16", "25 Dragon", "Kill 25 Dragon", false),
                new Achievement("17", "15 Damage", "Have 15 Damage", false),
                new Achievement("18", "20 Damage", "Have 20 Damage", false),
                new Achievement("19", "30 Damage", "Have 30 Damage", false),
                new Achievement("20", "50 Damage", "Have 50 Damage", false),
                new Achievement("21", "50 Demons", "Kill 50 Demons", false),
                new Achievement("22", "100 Demons", "Kill 100 Demons", false),
                new Achievement("23", "250 Demons", "Kill 250 Demons", false)));

        String username = userA.getUsername();
        if (userRepo.findUserAByUsername(username).equals(userA.getUsername())) {
            throw new IllegalArgumentException("Username already exist");
        } else {
            userA.setAchievements(achievements);
            userA.setId(generateUUID.generateUUID());
            userA.setPassword(encoder.encode(userA.getPassword()));
            userRepo.insert(userA);
        }
        return new UserDTO(userA.getId(), userA.getUsername(), userA.getAchievements());
    }

    public void saveUser(UserA userA) {
        userRepo.save(userA);
    }

    public UserDTO getUser(String username) {
        UserA optionalUserUnSave = userRepo.findUserAByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with this username: " + username + " not found"));
        return new UserDTO(optionalUserUnSave.getId(), optionalUserUnSave.getUsername(), optionalUserUnSave.getAchievements());
    }
}
