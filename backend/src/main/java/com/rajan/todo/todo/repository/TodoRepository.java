package com.rajan.todo.todo.repository;

import com.rajan.todo.todo.modal.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo,Integer> {
    @Query(value = "select t from Todo t where t.user.id = :userId")
    List<Todo> findTodoByUserId(Integer userId);
}
