package com.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.server.models.Article;
import com.server.repositories.ArticleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(ArticleRepository articleRepository, ObjectMapper objectMapper) {
		return args -> {

			String About = "<p>About content</p>";
			String Contact = "<p>Contact content</p>";

			articleRepository.save(new Article(null, "About", About, "Stine", LocalDateTime.now()));
			articleRepository.save(new Article(null, "Contact", Contact, "Stine", LocalDateTime.now()));

		};
	}
}
