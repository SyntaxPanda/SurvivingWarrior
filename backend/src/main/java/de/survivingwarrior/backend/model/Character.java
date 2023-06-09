package de.survivingwarrior.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("Characters")
public class Character {

    private String name;
    private String id;
    private int level = 1;
    private int exp = 0;
    private int life = 15;
    private double damage = 3;
    private int gold = 0;
    private Item[] inventory = new Item[6];
}
