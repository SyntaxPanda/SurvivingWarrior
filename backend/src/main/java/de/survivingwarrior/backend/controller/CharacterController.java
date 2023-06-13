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
    public Character newGameCharacterName(@RequestBody Character character){
        return characterService.newGameCharacterName(character);
    }

    @GetMapping("/{id}")
    public Optional<Character> getCharacterById(@PathVariable String id){
        return characterService.getCharacterById(id);
    }

}
