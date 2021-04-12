package com.template.springjwtsecurity.seeders;

import com.template.springjwtsecurity.models.Role;
import com.template.springjwtsecurity.repositories.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class RolesSeeder {
    @Autowired
    private RolesRepository rolesRepository;

    @EventListener
    private void seed(ContextRefreshedEvent event) {
        String[] names = {"ADMIN", "USER"};

        if (this.rolesRepository.count() == 0) {
            Set<Role> roles = new HashSet<>();
            for (String name :
                    names) {
                Role role = new Role(name);
                roles.add(role);
            }

            this.rolesRepository.saveAll(roles);
        } else {
            if (this.rolesRepository.findByName("ADMIN") == null) {
                Role admin = new Role("ADMIN");
                this.rolesRepository.save(admin);
            }

            if (this.rolesRepository.findByName("USER") == null) {
                Role user = new Role("USER");
                this.rolesRepository.save(user);
            }
        }
    }
}
