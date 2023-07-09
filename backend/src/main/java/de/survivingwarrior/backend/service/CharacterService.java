package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.model.Character;
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
        character.setId(generateUUID.generateUUID());
        character.setGold(0);
        character.setDamage(5);
        character.setLife(55);
        character.setLevel(1);
        character.setSkillPoints(10);
        character.setMaxLife(character.getLife());
        character.setPots(5);
        character.setHealPower(7);
        character.setMaxPots(character.getPots());
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
