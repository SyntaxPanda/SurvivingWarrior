package de.survivingwarrior.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Users")
@With
public class UserA {

    private String id;
    private String username;
    private String password;
    private List<Achievement> achievements;
}
