package com.rajan.todo.todo.services;

import com.rajan.todo.todo.modal.Todo;

import java.util.List;

public interface TodoService {
    public Todo createTodo(Integer userId,Todo todo) throws Exception;
    public Todo updateTodo(Todo todo,Integer todoId, Integer userId) throws Exception;
    public String deleteTodo(Integer id,Integer userId) throws Exception;
    public Todo getTodoItem(Integer todoId,Integer userId) throws Exception;
    public List<Todo> getAllTodo(Integer userId) throws Exception;

}
