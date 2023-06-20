package de.survivingwarrior.backend.model;

import lombok.*;

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
