package de.survivingwarrior.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CharacterModel {

    private String name;
    private String id;
    private int level;
    private int exp;
    private int leben;
    private int schaden;
    private int vitality;
    private int strength;
    private int intelligenz;
    private int dexterity;
    private int gold;
    private Items[] inventory = new Items[6];

}
