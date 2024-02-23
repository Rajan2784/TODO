package com.rajan.todo.todo.services;

import com.rajan.todo.todo.modal.Todo;
import com.rajan.todo.todo.modal.User;
import com.rajan.todo.todo.repository.TodoRepository;
import com.rajan.todo.todo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
@Service
public class TodoServiceImpl implements TodoService{
    @Autowired
    private TodoRepository todoRepository;
    @Autowired
    private UserRepository userRepository;
    @Override
    public Todo createTodo(Integer userId, Todo todo) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()){
            throw new Exception("User not found with id: "+userId);
        }
        User newUser = user.get();
        Todo newTodo =  new Todo();
        newTodo.setTitle(todo.getTitle());
        newTodo.setDescription(todo.getDescription());
        newTodo.setUser(newUser);
        newTodo.setTimeStamp(LocalDateTime.now());
        return todoRepository.save(newTodo);
    }

    @Override
    public Todo updateTodo(Todo todo, Integer todoId,Integer userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()){
            throw new Exception("User not found with id: "+userId);
        }
        Optional<Todo> searchTodo = todoRepository.findById(todoId);
        Todo todo1 = searchTodo.get();

        if (!userId.equals(todo1.getUser().getId())){
            throw new Exception("item is not found with the id "+ todoId);
        }
        Todo oldTodo = searchTodo.get();
        if (todo.getDescription()!=null){
            oldTodo.setDescription(todo.getDescription());
        }
        if (todo.getTitle()!=null){
            oldTodo.setTitle(todo.getTitle());
        }
        if (todo.getTimeStamp()!=null){
            oldTodo.setTimeStamp(todo.getTimeStamp());
        }
        if (todo.getIsCompleted()!=null){
            oldTodo.setIsCompleted(todo.getIsCompleted());
        }
        return todoRepository.save(oldTodo);
    }

    @Override
    public String deleteTodo(Integer id,Integer userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()){
            throw new Exception("User not found with id: "+userId);
        }
        Optional<Todo> searchTodo = todoRepository.findById(id);
        if (searchTodo.isEmpty()){
            throw new Exception("item is not found with the id "+ id);
        }
        Todo oldTodo = searchTodo.get();
        if (!userId.equals(oldTodo.getUser().getId())){
            throw new Exception("You are not the owner to delete this todo...");
        }
        todoRepository.deleteById(id);

        return "todo delted successfully";
    }

    @Override
    public Todo getTodoItem(Integer todoId, Integer userId) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()){
            throw new Exception("User not found with id: "+userId);
        }
        Optional<Todo> searchTodo = todoRepository.findById(todoId);
        if (searchTodo.isEmpty()){
            throw new Exception("item is not found with the id "+ todoId);
        }
        return searchTodo.get();
    }

    @Override
    public List<Todo> getAllTodo(Integer userId) throws Exception {
        List<Todo> allTodo = todoRepository.findTodoByUserId(userId);
        if (allTodo.isEmpty()){
            throw new Exception("No item found create some Todo items");
        }
        return allTodo;
    }
}
