package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Character;
import de.survivingwarrior.backend.model.Item;
import de.survivingwarrior.backend.repo.CharacterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepo characterRepo;
    private final GenerateUUID generateUUID;
    private final Random random = new Random();

    public Character newGameCharacterName(Character character) {
        Item[] inventory = new Item[6];
        character.setId(generateUUID.generateUUID());
        character.setInventory(inventory);
        character.setGold(random.nextInt(11) + 4);
        character.setDamage(random.nextInt(6) +3);
        character.setLife(random.nextInt(21) + 13);
        character.setLevel(1);
        return characterRepo.insert(character);
    }

    public Optional<Character> getCharacterById(String id) {
        return characterRepo.findById(id);
    }

    public void characterSave(Character character) {
        characterRepo.save(character);
    }

    public void lostTheGame(String id) {
        characterRepo.deleteById(id);
    }
}
