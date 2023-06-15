package de.survivingwarrior.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GenerateUUID {

    public String generateUUID(){
        return UUID.randomUUID().toString();
    }
}
