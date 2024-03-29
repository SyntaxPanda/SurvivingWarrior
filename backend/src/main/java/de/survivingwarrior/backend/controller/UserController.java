package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.model.UserA;
import de.survivingwarrior.backend.model.UserDTO;
import de.survivingwarrior.backend.service.UserService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @PostMapping("/register")
    public UserDTO registerUser(@RequestBody UserA userA){
        return userService.registerUser(userA);
    }

    @PostMapping("/login")
    public String userLogin(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/username")
    public String getUsername(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/me")
    public String getMeControllerOnly(Principal principal){
        if(principal != null){
            return principal.getName();
        }
        return "Pls Login";
    }

    @PostMapping("/logout")
    String logout(HttpSession httpSession){
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "Ur logout";
    }


    //Test schreiben
    @GetMapping("/details/{username}")
    public UserDTO getUser(@PathVariable String username){
        return userService.getUser(username);
    }

    @PutMapping("/achievement/reached")
    public void saveUser(@RequestBody UserA userA){
        userService.saveUser(userA);
    }

    @GetMapping("/all")
    public List<UserDTO> getAllUser(){
        return userService.getAllUser();
    }
}
