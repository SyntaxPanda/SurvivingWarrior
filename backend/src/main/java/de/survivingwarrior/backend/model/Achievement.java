package de.survivingwarrior.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Achievement {

    private String id;
    private String name;
    private String description;
    private boolean reached;
}
