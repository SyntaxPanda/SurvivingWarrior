package de.survivingwarrior.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("Items")
public class Item {

    private String name;
    private String id;
    private String info;
    private int effect;
    private int gold;
    private String image;

}
