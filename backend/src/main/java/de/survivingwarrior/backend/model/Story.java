package de.survivingwarrior.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("StoryChapters")
public class Story {

    private String name;
    private String id;
    private String storyText;
    private String option1;
    private String option2;
    private String option3;
    private List<Enemy> enemies;
}
