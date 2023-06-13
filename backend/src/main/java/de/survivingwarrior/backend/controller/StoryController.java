package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.model.Story;
import de.survivingwarrior.backend.service.StoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
