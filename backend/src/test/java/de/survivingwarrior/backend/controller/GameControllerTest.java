package de.survivingwarrior.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.survivingwarrior.backend.model.Game;
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
class GameControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser()
    void newGame() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/game/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1",
                                "username": ""
                                }
                                """
                ).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1",
                                "username": ""
                                }
                                """
                )).andExpect(jsonPath("$.gameId").isNotEmpty());

    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void getGameById() throws Exception {
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/api/game/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1",
                                "username": ""
                                }
                                """
                ).with(csrf())).andReturn();

        String content = response.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Game game = mapper.readValue(content, Game.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/game/" + game.getGameId()).with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1",
                                "username": ""
                                }
                                """
                )).andExpect(jsonPath("$.gameId").value(game.getGameId()));
    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void getAllGamesWithEmptyList() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/game/all/" + "username").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void saveGame() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/game/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1",
                                "username": ""
                                }
                                """
                ).with(csrf())).andReturn();

        mockMvc.perform(MockMvcRequestBuilders.put("/api/game/save")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-4"
                                }
                                """
                ).with(csrf()))
                .andReturn();
    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void lostTheGameAndDeleteThisGame() throws Exception {
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/api/game/new")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "gameName": "TestGame",
                                "characterId": "1",
                                "storyId": "1-1",
                                "username": ""
                                }
                                """
                )
                .with(csrf())).andReturn();

        String content = response.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Game game = mapper.readValue(content, Game.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/game/lost/" + game.getGameId()).with(csrf()))
                .andExpect(status().isOk());
    }
}