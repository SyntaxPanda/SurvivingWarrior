package de.survivingwarrior.backend.service;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class GernerateUUID {

    public String generateUUID(){
        return UUID.randomUUID().toString();
    }
}
