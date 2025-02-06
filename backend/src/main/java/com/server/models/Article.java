package com.server.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Article {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String author;

    @Column(columnDefinition = "text") // Store JSON as text
    private String content; // Delta object stored as a string

    @Column(name = "last_updated_at")
    private LocalDateTime lastUpdatedAt;

    public Article() {
    }

    public Article(Long id, String title, String content, String author, LocalDateTime lastUpdatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.lastUpdatedAt = lastUpdatedAt;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getLastUpdatedAt() {
        return lastUpdatedAt;
    }

    public void setLastUpdatedAt(LocalDateTime lastUpdatedAt) {
        this.lastUpdatedAt = lastUpdatedAt;
    }
}
