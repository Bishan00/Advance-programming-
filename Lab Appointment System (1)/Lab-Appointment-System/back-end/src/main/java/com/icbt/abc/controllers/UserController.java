package com.icbt.abc.controllers;

import com.icbt.abc.dtos.PasswordUpdateDto;
import com.icbt.abc.dtos.RequestResponse;
import com.icbt.abc.entities.User;
import com.icbt.abc.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<RequestResponse> signUp(@RequestBody RequestResponse signUpRequest){
        return ResponseEntity.ok(authService.signUp(signUpRequest));
    }
    @PostMapping("/signin")
    public ResponseEntity<RequestResponse> signIn(@RequestBody RequestResponse signInRequest){
        return ResponseEntity.ok(authService.signIn(signInRequest));
    }

    @PutMapping("/update_user")
    public ResponseEntity<RequestResponse> updateUser(@RequestBody RequestResponse updateUser){
        return ResponseEntity.ok(authService.updateUser(updateUser));
    }

    @PutMapping("/update_user_password/{userId}")
    public ResponseEntity<PasswordUpdateDto> updateUser(@PathVariable String userId, @RequestBody PasswordUpdateDto updateUser){
        return ResponseEntity.ok(authService.updateUserPassword(userId, updateUser));
    }

    @GetMapping("/get_all_user")
    public List<User> updateUser(){
        return authService.getAllUser();
    }

    @GetMapping("/get_user/{userId}")
    public Optional<User> getUser(@PathVariable String userId){
        System.out.println("hello");
        return authService.getSpecificUser(userId);
    }
}
