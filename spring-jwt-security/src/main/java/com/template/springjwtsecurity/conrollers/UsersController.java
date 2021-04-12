package com.template.springjwtsecurity.conrollers;

import com.template.springjwtsecurity.models.AppUser;
import com.template.springjwtsecurity.services.AppUserService;
import com.template.springjwtsecurity.services.RolesService;
import com.template.springjwtsecurity.util.Response;
import com.template.springjwtsecurity.util.RoleModel;
import com.template.springjwtsecurity.util.UpdateUserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/users")
public class UsersController {

    @Autowired
    private AppUserService appUserService;

    @Autowired
    private RolesService rolesService;

    @GetMapping(path = "/admin")
//    @Secured("ADMIN")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> adminOnly() {
        return new ResponseEntity<Response>(new Response("Hello, ADMIN!", null), HttpStatus.OK);
    }

    @GetMapping(path = "/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAll() {
        List<AppUser> users = this.appUserService.getAll();

        Response response = new Response<List<AppUser>>(users, null);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path = "/details/{id}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getUser(@PathVariable int id) {
        AppUser userExists = this.appUserService.getById(id);

        if (userExists == null) {
            return new ResponseEntity<Response>(new Response(null, "User not found!"), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new Response<AppUser>(userExists, null), HttpStatus.OK);
    }

    @PutMapping(path = "/details/{id}")
//    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> edit(@RequestBody UpdateUserModel newUser, @PathVariable int id) {
        AppUser userExists = this.appUserService.getById(id);

        if (userExists == null) {
            return new ResponseEntity<Response>(new Response(null, "User not found!"), HttpStatus.BAD_REQUEST);
        }

        if (!newUser.getUsername().equals(userExists.getUsername()) && this.appUserService.isUsernameUsed(newUser.getUsername())) {
            return new ResponseEntity<Response>(new Response(null, "Username already in use!"), HttpStatus.BAD_REQUEST);
        }

        if (!newUser.getEmail().equals(userExists.getEmail()) && this.appUserService.isEmailUsed(newUser.getEmail())) {
            return new ResponseEntity<Response>(new Response(null, "Email address already in use!"), HttpStatus.BAD_REQUEST);
        }

        UserDetails loggedInUser = this.loggedInUser();

        if (!this.isLoggedInUserAdmin(loggedInUser) &&
                newUser.getRoles().stream().map(RoleModel::getName).noneMatch(name -> name.equals("USER"))) {
            return new ResponseEntity<Response>(new Response(null, "Role USER cannot be removed!"), HttpStatus.BAD_REQUEST);
        }

        userExists.setName(newUser.getName());
        userExists.setUsername(newUser.getUsername());
        userExists.setEmail(newUser.getEmail());

        if (this.isLoggedInUserAdmin(loggedInUser)) {
            Set<String> roleNames = newUser.getRoles().stream().map(RoleModel::getName).collect(Collectors.toSet());
            userExists.getRoles().clear();
            for (String roleName : roleNames) {
                userExists.getRoles().add(this.rolesService.findByName(roleName));
            }
        }

        this.appUserService.saveAppUser(userExists);

        return new ResponseEntity<Response>(new Response<String>("User details has been updated!", null), HttpStatus.OK);
    }

    @GetMapping(path = "/user")
    @PreAuthorize("hasAuthority('ADMIN') or hasAuthority('USER')")
    public ResponseEntity<?> userContent() {
        return new ResponseEntity<Response>(new Response("Hello, USER!", null), HttpStatus.OK);
    }

    private UserDetails loggedInUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return (UserDetails) authentication.getPrincipal();
    }

    private boolean isLoggedInUserAdmin(UserDetails loggedInUser) {
        return loggedInUser.getAuthorities().stream().map(GrantedAuthority::getAuthority).anyMatch(role -> role.equals("ADMIN"));
    }
}
