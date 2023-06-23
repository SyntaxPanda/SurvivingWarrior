package de.survivingwarrior.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class StoryControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Test
    @DirtiesContext
    @WithMockUser()
    void createNewStoryChapter() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.post("/api/story/newstory")
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                    """
                            {
                            "name": "Test",
                            "id": "1-1",
                            "storyText": "TextTest",
                            "option1": "",
                            "option2": "",
                            "option3": ""
                            }
                            """
            ).with(csrf())).andExpect(status().isOk())
            .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser()
    void getStoryChapterById() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/story/newstory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "name": "Test",
                                "id": "1-1",
                                "storyText": "TextTest",
                                "option1": "",
                                "option2": "",
                                "option3": "",
                                "enemies": []
                                }
                                """
                ).with(csrf())).andReturn();

        mockMvc.perform(MockMvcRequestBuilders.get("/api/story/1-1").with(csrf()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "name": "Test",
                                "id": "1-1",
                                "storyText": "TextTest",
                                "option1": "",
                                "option2": "",
                                "option3": "",
                                "enemies": []
                                }
                                """
                )).andExpect(jsonPath("$.id").value("1-1"));
    }
}