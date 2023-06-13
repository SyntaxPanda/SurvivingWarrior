package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Character;
import de.survivingwarrior.backend.model.Item;
import de.survivingwarrior.backend.repo.CharacterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepo characterRepo;
    private final GernerateUUID gernerateUUID;

    public Character newGameCharacterName(Character character) {
        Item[] inventory = new Item[6];
        character.setId(gernerateUUID.generateUUID());
        character.setInventory(inventory);
        return characterRepo.insert(character);
    }

    public Optional<Character> getCharacterById(String id) {
        return characterRepo.findById(id);
    }
}
