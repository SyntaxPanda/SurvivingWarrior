package de.survivingwarrior.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.survivingwarrior.backend.model.Story;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class StoryControllerTest {

    @Autowired
    MockMvc mockMvc;
    @Test
    @DirtiesContext
    void createNewStoryChapter() throws Exception {
    mockMvc.perform(MockMvcRequestBuilders.post("/api/story/newstory")
            .contentType(MediaType.APPLICATION_JSON)
            .content(
                    """
                            {
                            "name": "Test",
                            "id": "1-1",
                            "image": "",
                            "storyText": "TextTest",
                            "option1": "",
                            "option2": "",
                            "option3": "",
                            "option4": ""
                            }
                            """
            )).andExpect(status().isOk())
            .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void getStoryChapterById() throws Exception {
        MvcResult response = mockMvc.perform(MockMvcRequestBuilders.post("/api/story/newstory")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                        """
                                {
                                "name": "Test",
                                "id": "1-1",
                                "image": "",
                                "storyText": "TextTest",
                                "option1": "",
                                "option2": "",
                                "option3": "",
                                "option4": ""
                                }
                                """
                )).andReturn();

        String content = response.getResponse().getContentAsString();

        ObjectMapper mapper = new ObjectMapper();
        Story story = mapper.readValue(content, Story.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/story/" + story.getId()))
                .andExpect(status().isOk())
                .andExpect(content().json(
                        """
                                {
                                "name": "Test",
                                "id": "1-1",
                                "image": "",
                                "storyText": "TextTest",
                                "option1": "",
                                "option2": "",
                                "option3": "",
                                "option4": ""
                                }
                                """
                )).andExpect(jsonPath("$.id").value(story.getId()));
    }
}