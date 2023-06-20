package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Enemy;
import de.survivingwarrior.backend.model.Kobold;
import de.survivingwarrior.backend.model.Story;
import de.survivingwarrior.backend.repo.StoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class StoryService {

    private final StoryRepo storyRepo;
    private final GenerateUUID generateUUID = new GenerateUUID();
    private final Random random = new Random();

    public Story createNewStoryChapter(Story story) {
        Kobold kobold1 = new Kobold(generateUUID.generateUUID(), "Kobold", random.nextInt(5) +1, random.nextInt(10) +5, random.nextInt(10) +1);
        Kobold kobold2 = new Kobold(generateUUID.generateUUID(), "Kobold", random.nextInt(5) +1, random.nextInt(10) +5, random.nextInt(10) +1);
        List<Enemy> enemies = new ArrayList<>();
        enemies.add(kobold1);
        enemies.add(kobold2);
        story.setEnemies(enemies);
        return storyRepo.insert(story);
    }

    public Optional<Story> getStoryChapterById(String id) {
       return storyRepo.findById(id);
    }
}
