package de.survivingwarrior.backend.controller;

import de.survivingwarrior.backend.model.User;
import de.survivingwarrior.backend.model.UserDTO;
import de.survivingwarrior.backend.security.SecurityConfig;
import de.survivingwarrior.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    @PostMapping("/register")
    public UserDTO registerUser(@RequestBody User user){
        return userService.registerUser(user);
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
}