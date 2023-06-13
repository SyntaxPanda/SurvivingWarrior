package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.model.Character;
import de.survivingwarrior.backend.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/character")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @PostMapping("/newchar")
    public Character newGameCharacterName(@RequestBody String characterName){
        return characterService.newGameCharacterName(characterName);
    }

    @GetMapping("")
    public Optional<Character> getCharacterById(@RequestBody String id){
        return characterService.getCharacterById(id);
    }

}
