package de.survivingwarrior.backend.repo;

import de.survivingwarrior.backend.model.UserA;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo extends MongoRepository<UserA, String> {
    Optional<UserA> findByUsername(String username);
}
