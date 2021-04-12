package com.template.springjwtsecurity.conrollers;

import com.template.springjwtsecurity.models.AppUser;
import com.template.springjwtsecurity.models.Role;
import com.template.springjwtsecurity.services.AppUserService;
import com.template.springjwtsecurity.services.RolesService;
import com.template.springjwtsecurity.util.JwtResponse;
import com.template.springjwtsecurity.util.LoginForm;
import com.template.springjwtsecurity.util.Response;
import com.template.springjwtsecurity.util.SignUpForm;
import com.template.springjwtsecurity.websecurity.jwt.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api")
public class HomeController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private RolesService rolesService;

    @Autowired
    private JwtProvider jwtProvider;

    @PostMapping(path = "/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginForm loginForm) {

        //JsonObject json = new Gson().fromJson(body, JsonObject.class);

        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginForm.getUsername(), loginForm.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = this.jwtProvider.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        String id = String.valueOf(this.appUserService.getUserId(username));

        return ResponseEntity.ok(new JwtResponse(jwt, id, username, userDetails.getAuthorities()));
    }

    @PostMapping(path = "/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpForm signUpForm) {
        if (this.appUserService.isUsernameUsed(signUpForm.getUsername())) {
            return new ResponseEntity<Response>(
                    new Response(null, "Username already in use!"), HttpStatus.BAD_REQUEST);
        }

        if (this.appUserService.isEmailUsed(signUpForm.getEmail())) {
            return new ResponseEntity<Response>(
                    new Response(null, "Email already in use!"), HttpStatus.BAD_REQUEST);
        }

        AppUser user = new AppUser(signUpForm.getName(), signUpForm.getUsername(), signUpForm.getEmail(),
                this.passwordEncoder.encode(signUpForm.getPassword()));

        Role role;
        if (this.appUserService.count() == 0) {
            role = this.rolesService.findByName("ADMIN");
        } else {
            role = this.rolesService.findByName("USER");
        }

        Set<Role> roles = new HashSet<>();
        roles.add(role);

        user.setRoles(roles);

        this.appUserService.saveAppUser(user);

        return new ResponseEntity<Response>(new Response<String>("User registered successfully!", null), HttpStatus.OK);
    }
}
