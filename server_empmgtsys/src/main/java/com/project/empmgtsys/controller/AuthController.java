package com.project.empmgtsys.controller;

import com.project.empmgtsys.entity.Users;
import com.project.empmgtsys.jwt.JwtUtil;
import com.project.empmgtsys.service.UserService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Data
public class AuthController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/api/employee/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Users user = userService.loginUser(authRequest.getUsername(), authRequest.getPassword());
        if (user != null) {
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credentials");
    }

    @GetMapping("/api/employee/check-auth")
    public ResponseEntity<?> checkAuth(@RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.substring(7));
        if (username != null && jwtUtil.validateToken(token.substring(7), username)) {
            return ResponseEntity.ok("Authenticated");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not authenticated");
    }


}

@Data
class AuthRequest {
    private String username;
    private String password;
    // getters and setters
}

@Data
class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
