package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.model.Character;
import de.survivingwarrior.backend.model.Game;
import de.survivingwarrior.backend.model.Story;
import de.survivingwarrior.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    @PostMapping("/newGame")
    public Game newGame(@RequestBody String gameName, @RequestBody Character character, @RequestBody Story story){
        return gameService.newGame(gameName, character, story);
    }

}
