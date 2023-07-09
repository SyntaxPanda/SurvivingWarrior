package de.survivingwarrior.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.survivingwarrior.backend.model.Character;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CharacterControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser()
    void newGameCharacterName() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/character/newchar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "name": "Hans"
                                        }"""
                        ).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                    "name": "Hans",
                                    "level": 1,
                                    "exp": 0,
                                    "skillPoints": 10,
                                    "healPower": 7,
                                    "pots": 5,
                                    "maxPots": 5
                                }"""
                )).andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(jsonPath("$.life").isNotEmpty())
                .andExpect(jsonPath("$.damage").isNotEmpty())
                .andExpect(jsonPath("$.gold").isNotEmpty())
                .andExpect(jsonPath("$.maxLife").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void getCharacterById() throws Exception {
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/api/character/newchar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(
                                """
                                        {
                                        "name": "Hans"
                                        }"""
                        )
                        .with(csrf()))
                .andReturn();

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
                                    "skillPoints": 10,
                                    "healPower": 7,
                                    "pots": 5,
                                    "maxPots": 5
                                }"""
                )).andExpect(jsonPath("$.id").value(character.getId()))
                .andExpect(jsonPath("$.life").value(character.getLife()))
                .andExpect(jsonPath("$.damage").value(character.getDamage()))
                .andExpect(jsonPath("$.gold").value(character.getGold()))
                .andExpect(jsonPath("$.maxLife").value(character.getLife()));
    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void characterSave() throws Exception {
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/api/character/newchar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "name": "Hans"
                                }"""
                ).with(csrf())
        ).andReturn();

        String content = response.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Character character = mapper.readValue(content, Character.class);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/character/" + character.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                "level": 2,
                                "damage": 10,
                                "skillPoints": 0,
                                "maxLife": 10
                                }
                                """).with(csrf()))
                .andExpect(status().isOk());

    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void lostTheGameAndDeleteCharacter() throws Exception {
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/api/character/newchar")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "name": "Hans"
                                }"""
                ).with(csrf())).andReturn();

        String content = response.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Character character = mapper.readValue(content, Character.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/character/lost/" + character.getId()).with(csrf()))
                .andExpect(status().isOk());
    }
}