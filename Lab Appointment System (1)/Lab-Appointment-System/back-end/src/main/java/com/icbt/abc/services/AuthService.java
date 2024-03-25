package com.icbt.abc.services;

import com.icbt.abc.dtos.PasswordUpdateDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.icbt.abc.dtos.RequestResponse;
import com.icbt.abc.entities.User;
import com.icbt.abc.repositories.UserRepository;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JWTUtils jwtUtils;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;

    public RequestResponse signUp(RequestResponse registrationRequest){
        RequestResponse resp = new RequestResponse();
        try {
            User ourUsers = new User();
            ourUsers.setFirstName(registrationRequest.getFirstName());
            ourUsers.setLastName(registrationRequest.getLastName());
            ourUsers.setEmail(registrationRequest.getEmail());
            ourUsers.setMobileNumber(registrationRequest.getMobileNumber());
            ourUsers.setPassword(passwordEncoder.encode(registrationRequest.getPassword()));
            ourUsers.setRole(registrationRequest.getRole());
            User ourUserResult = userRepo.save(ourUsers);
            if (ourUserResult != null && ourUserResult.getId()>0) {
//                resp.setUser(ourUserResult);
                resp.setMessage("User Saved Successfully");
                resp.setStatusCode(200);
            }
        }catch (Exception e){
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public RequestResponse signIn(RequestResponse signinRequest){
        RequestResponse response = new RequestResponse();

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),signinRequest.getPassword()));
            var user = userRepo.findByEmail(signinRequest.getEmail()).orElseThrow();
            System.out.println("USER IS: "+ user);
            var jwt = jwtUtils.generateToken(user);
            response.setStatusCode(200);
            response.setToken(jwt);
            response.setUserId(user.getId());
            response.setRole(user.getRole());
            response.setExpirationTime("24Hr");
            response.setMessage("Successfully Signed In");
        }catch (Exception e){
            response.setStatusCode(500);
            response.setError(e.getMessage());
        }
        return response;
    }

    public RequestResponse updateUser(RequestResponse updateUser) {
        RequestResponse resp = new RequestResponse();
        try {
            User existingUser = userRepo.findUserByEmail(updateUser.getEmail());

            existingUser.setFirstName(updateUser.getFirstName());
            existingUser.setLastName(updateUser.getLastName());
            existingUser.setEmail(updateUser.getEmail());
            existingUser.setMobileNumber(updateUser.getMobileNumber());

            User updatedUser = userRepo.save(existingUser);
            resp.setMessage("User Updated Successfully");
            resp.setStatusCode(200);
            resp.setUser(updatedUser);
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public PasswordUpdateDto updateUserPassword(String userId, PasswordUpdateDto updateUser) {
        PasswordUpdateDto resp = new PasswordUpdateDto();
        try {
            User existingUser = userRepo.findUserById(Integer.parseInt(userId));

            existingUser.setPassword(passwordEncoder.encode(updateUser.getPassword()));

            userRepo.save(existingUser);
            resp.setMessage("Password Updated Successfully");
            resp.setStatusCode(200);
        } catch (Exception e) {
            resp.setStatusCode(500);
            resp.setError(e.getMessage());
        }
        return resp;
    }

    public List<User> getAllUser() {
        return userRepo.findAll();
    }

    public Optional<User> getSpecificUser(String userId) {
        return userRepo.findById(Integer.parseInt(userId));
    }

}
