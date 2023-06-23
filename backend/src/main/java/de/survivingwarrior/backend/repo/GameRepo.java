package de.survivingwarrior.backend.repo;

import de.survivingwarrior.backend.model.Game;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepo extends MongoRepository<Game, String> {

    List<Game> findAllByUsername(String username);
}
