package de.survivingwarrior.backend.repo;

import de.survivingwarrior.backend.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends MongoRepository<User, String> {
    Object findUserByUsername(String username);
}
