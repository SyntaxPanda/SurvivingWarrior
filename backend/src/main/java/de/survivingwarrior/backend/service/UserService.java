package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.User;
import de.survivingwarrior.backend.model.UserDTO;
import de.survivingwarrior.backend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepo userRepo;
    private final GenerateUUID generateUUID;

    public UserDTO registerUser(User user) {
        if(userRepo.findUserByUsername(user.getUsername()).equals(user.getUsername())){
            throw new IllegalArgumentException("Username already exist");
        }
        user.setId(generateUUID.generateUUID());
        userRepo.insert(user);
        return new UserDTO(user.getId(), user.getUsername());
    }

}
