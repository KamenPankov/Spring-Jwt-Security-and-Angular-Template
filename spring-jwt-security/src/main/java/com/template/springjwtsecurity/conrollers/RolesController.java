package com.template.springjwtsecurity.conrollers;

import com.template.springjwtsecurity.models.Role;
import com.template.springjwtsecurity.services.RolesService;
import com.template.springjwtsecurity.util.AddRoleModel;
import com.template.springjwtsecurity.util.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(path = "/api/roles")
public class RolesController {

    @Autowired
    private RolesService rolesService;

    @GetMapping(path = "/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> getAll() {
        List<Role> roles = this.rolesService.getAll();
        Response response = new Response<List<Role>>(roles, null);

        return new ResponseEntity<Response>(response, HttpStatus.OK);
    }


    @PostMapping(path = "/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> addRole(@RequestBody AddRoleModel model) {
        String name = model.getName().toUpperCase(Locale.ROOT);

        if (name == null || name.trim().isEmpty()) {
            return new ResponseEntity<Response>(new Response(null, "Role name is missing"), HttpStatus.BAD_REQUEST);
        }

        if (this.rolesService.isRoleExist(name)) {
            return new ResponseEntity<Response>(new Response(null, String.format("Role %s already exists!", name)), HttpStatus.BAD_REQUEST);
        }

        String role = this.rolesService.add(name);
        return new ResponseEntity<Response>(new Response<String>(role, null), HttpStatus.OK);
    }

    @DeleteMapping(path = "/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<?> deleteRole(@PathVariable int id) {
        Role role = this.rolesService.findById(id);

        if (role == null) {
            return new ResponseEntity<>(new Response<String>(null, "Roles not found!"), HttpStatus.BAD_REQUEST);
        }

        if (role.getName().equals("ADMIN") || role.getName().equals("USER")) {
            return new ResponseEntity<>(new Response<String>(null, "Roles ADMIN and USER cannot be deleted!"), HttpStatus.BAD_REQUEST);
        }

        this.rolesService.deleteRole(id);

        return new ResponseEntity<Response>(new Response<String>(String.format("Role %s was deleted", role.getName()), null), HttpStatus.OK);
    }
}
