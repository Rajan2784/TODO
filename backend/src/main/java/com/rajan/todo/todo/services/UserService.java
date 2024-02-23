package com.rajan.todo.todo.services;

import com.rajan.todo.todo.modal.User;

public interface UserService {
    public User createUser(User user);
    public User updateUser(User user, Integer userId) throws Exception;
    public String deleteUser(Integer userId) throws Exception;
    public User findUserByJwt(String jwt);
}
