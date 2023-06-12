package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Character;
import de.survivingwarrior.backend.model.Game;
import de.survivingwarrior.backend.model.Story;
import de.survivingwarrior.backend.repo.GameRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepo gameRepo;
    private final GernerateUUID gernerateUUID;

    public Game newGame(String gameName, Character character, Story story) {
        Game newGame = new Game(
                gernerateUUID.generateUUID(),
                gameName,
                character,
                story
        );
        return gameRepo.insert(newGame);
    }
}
