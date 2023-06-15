package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Game;
import de.survivingwarrior.backend.repo.GameRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepo gameRepo;
    private final GernerateUUID gernerateUUID;

    public Game newGame(Game game) {
        game.setGameId(gernerateUUID.generateUUID());
        return gameRepo.insert(game);
    }

    public Optional<Game> getGameById(String id) {
        return gameRepo.findById(id);
    }
}
