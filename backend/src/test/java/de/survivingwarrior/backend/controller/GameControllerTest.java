package de.survivingwarrior.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.survivingwarrior.backend.model.Game;
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
class GameControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    void newGame() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/game/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1"
                                }
                                """
                ))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1"
                                }
                                """
                )).andExpect(jsonPath("$.gameId").isNotEmpty());

    }

    @Test
    @DirtiesContext
    void getGameById() throws Exception {
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/api/game/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1"
                                }
                                """
                )).andReturn();

        String content = response.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Game game = mapper.readValue(content, Game.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/game/" + game.getGameId()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1"
                                }
                                """
                )).andExpect(jsonPath("$.gameId").value(game.getGameId()));
    }

    @Test
    @DirtiesContext
    void getAllGamesWithEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/game/all"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

}