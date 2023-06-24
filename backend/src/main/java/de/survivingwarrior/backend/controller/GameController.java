package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.model.Game;
import de.survivingwarrior.backend.service.GameService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/game")
public class GameController {

    private final GameService gameService;

    @PostMapping("/new")
    public Game newGame(@RequestBody Game game){
        return gameService.newGame(game);
    }

    @GetMapping("/{id}")
    public Optional<Game> getGameById(@PathVariable String id){
        return gameService.getGameById(id);
    }

    @GetMapping("/all/{username}")
    public List<Game> getAllGames(@PathVariable String username){
        return gameService.getAllGames(username);
    }

    @PutMapping("/save")
    public void saveGame(@RequestBody Game game){
        gameService.saveGame(game);
    }

    @DeleteMapping("/lost/{id}")
    public void lostTheGame(@PathVariable String id){
        gameService.lostTheGame(id);
    }
}
