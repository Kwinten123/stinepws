package com.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.server.models.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {

}
