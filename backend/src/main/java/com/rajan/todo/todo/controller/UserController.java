package com.rajan.todo.todo.controller;

import com.rajan.todo.todo.modal.User;
import com.rajan.todo.todo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserController {
    @Autowired
    private UserService userService;

    @PutMapping("/api/update/user")
    public User updateUser(@RequestHeader("Authorization")String jwt, @RequestBody User user) throws Exception {
        User reqUser = userService.findUserByJwt(jwt);
        return userService.updateUser(user, reqUser.getId());
    }

    @GetMapping("/api/user")
    public User getUser(@RequestHeader("Authorization")String jwt){
        return userService.findUserByJwt(jwt);
    }
}
