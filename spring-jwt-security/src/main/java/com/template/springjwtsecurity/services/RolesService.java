package com.template.springjwtsecurity.services;

import com.template.springjwtsecurity.models.Role;
import com.template.springjwtsecurity.repositories.RolesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolesService {
    @Autowired
    RolesRepository rolesRepository;

    public List<Role> getAll() { return this.rolesRepository.findAll(); }

    public Role findByName(String name){
        return this.rolesRepository.findByName(name);
    }

    public Role findById(int id) { return this.rolesRepository.findById(id); }

    public String add(String name) {
        Role role = new Role(name);
        Role newRole = this.rolesRepository.save(role);
        return newRole.getName();
    }

    public void deleteRole(int id) { this.rolesRepository.deleteById(id); }

    public boolean isRoleExist(String name) { return this.rolesRepository.existsByName(name); }
}
