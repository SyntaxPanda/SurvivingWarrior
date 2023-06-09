package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.repo.CharacterRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CharacterService {

    private final CharacterRepo characterRepo;

}
