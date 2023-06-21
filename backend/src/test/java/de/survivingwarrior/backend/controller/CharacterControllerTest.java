package de.survivingwarrior.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.survivingwarrior.backend.model.Character;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CharacterControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    void newGameCharacterName() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/character/newchar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                        {
                        "name": "Hans"
                        }"""
                ))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                        {
                            "name": "Hans",
                            "level": 1,
                            "exp": 0,
                            "inventory": [
                                null,
                                null,
                                null,
                                null,
                                null,
                                null
                            ]
                        }"""
                )).andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.life").isNotEmpty())
                .andExpect(jsonPath("$.damage").isNotEmpty())
                .andExpect(jsonPath("$.gold").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void getCharacterById() throws Exception {
       MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/api/character/newchar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                        {
                        "name": "Hans"
                        }"""
                )).andReturn();

       String content = response.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Character character = mapper.readValue(content, Character.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/character/" + character.getId()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                        {
                            "name": "Hans",
                            "level": 1,
                            "exp": 0,
                            "inventory": [
                                null,
                                null,
                                null,
                                null,
                                null,
                                null
                            ]
                        }"""
                )).andExpect(jsonPath("$.id").value(character.getId()))
                .andExpect(jsonPath("$.life").value(character.getLife()))
                .andExpect(jsonPath("$.damage").value(character.getDamage()))
                .andExpect(jsonPath("$.gold").value(character.getGold()));

    }
}