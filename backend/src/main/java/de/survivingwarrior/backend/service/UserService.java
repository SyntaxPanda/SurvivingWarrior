package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Achievement;
import de.survivingwarrior.backend.model.UserA;
import de.survivingwarrior.backend.model.UserDTO;
import de.survivingwarrior.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class UserService implements UserDetailsService {

    private final UserRepo userRepo;
    private final GenerateUUID generateUUID;
    private final PasswordEncoder encoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("before find by username");
        UserA optionalUserUnSave = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with this username: " + username + " not found"));
        System.out.println("after find by username");
        return new User(optionalUserUnSave.getUsername(), optionalUserUnSave.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_BASIC")));
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
                new Achievement("9", "Level 100", "100 level overall", false),
                new Achievement("10", "Level 250", "250 level overall", false),
                new Achievement("11", "Level 500", "500 level overall", false),
                new Achievement("12", "Level 1000", "1000 level overall", false),
                new Achievement("13", "1 Dragon", "Kill 1 Dragon", false),
                new Achievement("14", "5 Dragon", "Kill 5 Dragon", false),
                new Achievement("15", "10 Dragon", "Kill 10 Dragon", false),
                new Achievement("16", "25 Dragon", "Kill 25 Dragon", false),
                new Achievement("17", "15 Damage", "Have 15 Damage", false),
                new Achievement("18", "20 Damage", "Have 20 Damage", false),
                new Achievement("19", "30 Damage", "Have 30 Damage", false),
                new Achievement("20", "50 Damage", "Have 50 Damage", false),
                new Achievement("21", "10000 Gold", "10000 Gold overall", false),
                new Achievement("22", "50000 Gold", "50000 Gold overall", false),
                new Achievement("23", "100000 Gold", "100000 Gold overall", false),
                new Achievement("24", "500000 Gold", "500000 Gold overall", false),
                new Achievement("25", "1000000 Gold", "1000000 Gold overall", false)));

        String username = userA.getUsername();
        if (userRepo.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("Username already exist");
        }

        userA.setAchievements(achievements);
        userA.setId(generateUUID.generateUUID());
        userA.setPassword(encoder.encode(userA.getPassword()));
        userRepo.insert(userA);

        return new UserDTO(userA.getId(),
                userA.getUsername(),
                userA.getAchievements(),
                userA.getDragonCounter(),
                userA.getLevelCounter(),
                userA.getGoldCounter());
    }

    public void saveUser(UserA userA) {
        UserA newUserA = userRepo.findByUsername(userA.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User with this username: " + userA.getUsername() + " not found"));
        newUserA.setId(userA.getId());
        newUserA.setDragonCounter(userA.getDragonCounter());
        newUserA.setAchievements(userA.getAchievements());
        newUserA.setLevelCounter(userA.getLevelCounter());
        newUserA.setGoldCounter(userA.getGoldCounter());
        userRepo.save(newUserA);
    }

    public UserDTO getUser(String username) {
        UserA optionalUserUnSave = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with this username: " + username + " not found"));
        return new UserDTO(optionalUserUnSave.getId(),
                optionalUserUnSave.getUsername(),
                optionalUserUnSave.getAchievements(),
                optionalUserUnSave.getDragonCounter(),
                optionalUserUnSave.getLevelCounter(),
                optionalUserUnSave.getGoldCounter());
    }
}
