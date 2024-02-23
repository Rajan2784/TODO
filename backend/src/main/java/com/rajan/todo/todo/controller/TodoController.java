package com.rajan.todo.todo.controller;


import com.rajan.todo.todo.modal.Todo;
import com.rajan.todo.todo.modal.User;
import com.rajan.todo.todo.services.TodoService;
import com.rajan.todo.todo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class TodoController {
    @Autowired
    private TodoService todoService;
    @Autowired
    private UserService userService;

    @PostMapping("/user/createTodo")
    public Todo createTodo(@RequestHeader("Authorization")String jwt,@RequestBody Todo todo) throws Exception {
        User user = userService.findUserByJwt(jwt);
        return todoService.createTodo(user.getId(), todo);
    }

    @PutMapping("/user/update/{todoId}")
    public Todo updateTodo(@RequestBody Todo todo, @PathVariable Integer todoId,@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);

        return todoService.updateTodo(todo,todoId, user.getId());
    }

    @GetMapping("/user/todo/{todoId}")
    public Todo getTodoItem(@PathVariable Integer todoId,@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        return todoService.getTodoItem(todoId,user.getId());
    }

    @DeleteMapping("/user/delete/{todoId}")
    public String deleteTodo(@PathVariable Integer todoId,@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        todoService.deleteTodo(todoId, user.getId());
        return "Todo item is deleted";
    }

    @GetMapping("/user/all/todo")
    public List<Todo> getAllTodo(@RequestHeader("Authorization")String jwt) throws Exception {
        User user = userService.findUserByJwt(jwt);
        return todoService.getAllTodo(user.getId());
    }

}
