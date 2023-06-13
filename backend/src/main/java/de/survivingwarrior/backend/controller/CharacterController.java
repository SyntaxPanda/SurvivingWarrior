package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.model.Character;
import de.survivingwarrior.backend.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/character")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @PostMapping("/newchar")
    public Character newGameCharacterName(@RequestBody String characterName){
        return characterService.newGameCharacterName(characterName);
    }

}
