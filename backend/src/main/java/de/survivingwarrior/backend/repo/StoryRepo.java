package de.survivingwarrior.backend.repo;

import de.survivingwarrior.backend.model.Story;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StoryRepo extends MongoRepository<Story, String> {

}
