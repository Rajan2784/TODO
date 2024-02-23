package com.rajan.todo.todo.modal;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private String title;
    private String description;
    private LocalDateTime timeStamp;
    private String isCompleted;
    @ManyToOne
    private User user;
}
