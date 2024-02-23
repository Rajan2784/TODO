package com.rajan.todo.todo.services;

import com.rajan.todo.todo.config.JwtProvider;
import com.rajan.todo.todo.modal.User;
import com.rajan.todo.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository userRepository;
    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(User user, Integer userId) throws Exception {
        Optional<User> updateUser = userRepository.findById(userId);
        if (updateUser.isEmpty()){
            throw new Exception("User not found with the id: "+userId);
        }
        User oldUser = updateUser.get();
        if (user.getFullName()!=null){
            oldUser.setFullName(user.getFullName());
        }
        if (user.getUsername()!=null){
            oldUser.setUsername(user.getUsername());
        }
        if (user.getEmail()!=null){
            oldUser.setEmail(user.getEmail());
        }
        if (user.getPassword()!=null){
            oldUser.setPassword(user.getPassword());
        }
        return userRepository.save(oldUser);
    }

    @Override
    public String deleteUser(Integer userId) throws Exception {
        Optional<User> updateUser = userRepository.findById(userId);
        if (updateUser.isEmpty()){
            throw new Exception("User not found with the id: "+userId);
        }
        userRepository.deleteById(userId);
        return "User deleted successfully";
    }

    @Override
    public User findUserByJwt(String jwt) {
        String email = JwtProvider.getNameFromJwtToken(jwt);
        return userRepository.findByEmail(email);
    }
}
