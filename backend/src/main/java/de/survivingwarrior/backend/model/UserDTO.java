package de.survivingwarrior.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private String id;
    private String username;
    private List<Achievement> achievements;
    private int dragonCounter;
    private int levelCounter;
    private int goldCounter;
}
