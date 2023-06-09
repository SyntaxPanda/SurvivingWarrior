package de.survivingwarrior.backend.service;

import de.survivingwarrior.backend.repo.ItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ItemService {

    private final ItemRepo itemRepo;

}
