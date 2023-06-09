package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/Item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

}
