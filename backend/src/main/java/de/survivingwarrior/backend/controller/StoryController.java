package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.model.Story;
import de.survivingwarrior.backend.service.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/story")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    @GetMapping("/{id}")
    public Optional<Story> getStoryChapterById(@PathVariable String id){
        return storyService.getStoryChapterById(id);
    }

}
