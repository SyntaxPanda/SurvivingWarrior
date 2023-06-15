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
    private final GenerateUUID generateUUID;

    public Character newGameCharacterName(Character character) {
        Item[] inventory = new Item[6];
        character.setId(generateUUID.generateUUID());
        character.setInventory(inventory);
        return characterRepo.insert(character);
    }

    public Optional<Character> getCharacterById(String id) {
        return characterRepo.findById(id);
    }
}
