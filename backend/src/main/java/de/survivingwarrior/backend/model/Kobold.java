package de.survivingwarrior.backend.model;

import de.survivingwarrior.backend.service.GenerateUUID;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Random;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Kobold extends Enemy{

    private String id;
    private String name;
    private int damage;
    private int life;
    private int gold;
}
