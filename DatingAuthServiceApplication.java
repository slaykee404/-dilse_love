package com.dating.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.dating.app")
public class DatingAuthServiceApplication {

	public static void main(String[] args) {
		// This single line starts the entire web server and application context
		SpringApplication.run(DatingAuthServiceApplication.class, args);
		System.out.println("Dating Auth Service is running on http://localhost:8080");
		System.out.println("Go to http://localhost:8080/register to get started.");
	}
}