package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Character;
import de.survivingwarrior.backend.model.Item;
import de.survivingwarrior.backend.repo.CharacterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepo characterRepo;
    private final GernerateUUID gernerateUUID;

    public void newGameCharacterName(String characterName) {
        Item[] inventory = new Item[6];
        Character newCharacter = new Character(
                characterName,
                gernerateUUID.generateUUID(),
                1,
                0,
                15,
                3,
                0,
                "1-1",
                inventory
        );
        characterRepo.insert(newCharacter);
    }
}
