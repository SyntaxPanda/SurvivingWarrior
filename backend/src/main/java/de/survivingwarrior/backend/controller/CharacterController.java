package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.service.CharacterService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/character")
@RequiredArgsConstructor
public class CharacterController {

    private final CharacterService characterService;

    @PostMapping("/newGame")
    public void newGameCharacterName(String characterName){
        characterService.newGameCharacterName(characterName);
    }

}
