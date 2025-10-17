package com.dating.app.controller;

import com.dating.app.model.User;
import com.dating.app.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.security.Principal;


@Controller
public class WebController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public WebController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // --- Registration ---

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register"; // Maps to src/main/resources/templates/register.html
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, RedirectAttributes redirectAttributes) {
        // Basic Validation
        if (user.getAge() == null || user.getAge() < 18) {
            redirectAttributes.addFlashAttribute("registrationError", "You must be 18 or older to register.");
            return "redirect:/register";
        }

        // Check for existing username
        if (userRepository.existsByUsername(user.getUsername())) {
            redirectAttributes.addFlashAttribute("registrationError", "Username is already taken!");
            return "redirect:/register";
        }

        // 1. Securely hash the password
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(encodedPassword);

        // 2. Save the new user (including age and email) to PostgreSQL
        userRepository.save(user);

        redirectAttributes.addFlashAttribute("registrationSuccess", "Success! Your profile is ready. Please log in.");
        return "redirect:/login"; 
    }
    

    @GetMapping("/")
    public String home() {
        return "redirect:/secure";
    }

    @GetMapping("/login")
    public String showLoginForm(
            @RequestParam(value = "error", required = false) String error,
            @RequestParam(value = "logout", required = false) String logout,
            Model model) {
        
        if (error != null) {
            model.addAttribute("loginError", "Invalid username or password.");
        }
        if (logout != null) {
            model.addAttribute("logoutMessage", "You have been logged out successfully.");
        }
        return "login"; // Maps to src/main/resources/templates/login.html
    }
    
    @GetMapping("/secure")
    public String securePage(Principal principal, Model model) {
        if (principal != null) {
            // Find the full user object to display more details (like age)
            userRepository.findByUsername(principal.getName()).ifPresent(user -> {
                model.addAttribute("username", user.getUsername());
                model.addAttribute("age", user.getAge());
            });
        }
        return "secure"; // Maps to src/main/resources/templates/secure.html
    }
}