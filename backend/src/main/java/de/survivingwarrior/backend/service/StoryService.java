package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Story;
import de.survivingwarrior.backend.repo.StoryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoryService {

    private final StoryRepo storyRepo;

    //public Story getStoryChapterById() {
    //   return storyRepo.findById("1-1");
    //}
}
