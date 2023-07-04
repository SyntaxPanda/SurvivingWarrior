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
    private int level;
    private int exp;
    private int skillPoints;
    private int life;
    private int maxLife;
    private int damage;
    private int healPower;
    private int pots;
    private int maxPots;
    private int gold;
}
