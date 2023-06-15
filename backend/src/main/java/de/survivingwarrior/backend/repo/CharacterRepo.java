package de.survivingwarrior.backend.repo;

import de.survivingwarrior.backend.model.Character;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CharacterRepo extends MongoRepository<Character, String> {

}
