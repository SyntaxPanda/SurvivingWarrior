package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Story;
import de.survivingwarrior.backend.repo.StoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoryService {

    private final StoryRepo storyRepo;

    public Optional<Story> getStoryChapterById(String id) {
       return storyRepo.findById(id);
    }
}