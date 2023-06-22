package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Game;
import de.survivingwarrior.backend.repo.GameRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepo gameRepo;
    private final GenerateUUID generateUUID;

    public Game newGame(Game game) {
        game.setGameId(generateUUID.generateUUID());
        return gameRepo.insert(game);
    }

    public Optional<Game> getGameById(String id) {
        return gameRepo.findById(id);
    }

    public List<Game> getAllGames() {
        return gameRepo.findAll();
    }

    public void saveGame(Game game) {
        gameRepo.save(game);
    }

    public void lostTheGame(String id) {
        gameRepo.deleteById(id);
    }
}
