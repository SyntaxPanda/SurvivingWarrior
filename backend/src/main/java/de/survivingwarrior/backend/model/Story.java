package de.survivingwarrior.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("StoryChapters")
public class Story {
    private String chapter;
    private String Name;
    private String id;
    private String storyMode;
    private String image;
    private String storyText;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
}
