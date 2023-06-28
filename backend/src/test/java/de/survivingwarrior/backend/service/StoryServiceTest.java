//package de.survivingwarrior.backend.service;
//
//import de.survivingwarrior.backend.repo.StoryRepo;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//
//import static org.junit.jupiter.api.Assertions.*;
//import static reactor.core.publisher.Mono.when;
//
//class StoryServiceTest {
//
//    private StoryRepo storyRepo;
//    @BeforeEach
//    void setup(){
//        storyRepo = Mockito.mock(StoryRepo.class);
//    }
//
//    @Test
//    void getStoryChapterById() {
//        //Given
//        List<ProductBody> expected = List.of(new ProductBody());
//        when(productSystemService.getProductList()).thenReturn(expected);
//        //When
//        List<ProductBody> actual = orderSystemService.getProductList();
//        //Then
//        assertEquals(expected, actual);
//    }
//}