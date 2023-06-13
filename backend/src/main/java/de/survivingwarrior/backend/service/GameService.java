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

    public Game newGame(String gameName, String characterId, String story) {
        Game game = new Game(
                gernerateUUID.generateUUID(),
                gameName,
                characterId,
                story
        );
        return gameRepo.insert(game);
    }

    public Optional<Game> getGameById(String id) {
        return gameRepo.findById(id);
    }
}
