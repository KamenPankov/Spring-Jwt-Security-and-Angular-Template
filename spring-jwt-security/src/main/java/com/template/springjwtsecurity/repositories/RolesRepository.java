package com.template.springjwtsecurity.repositories;

import com.template.springjwtsecurity.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RolesRepository extends JpaRepository<Role, Integer> {
    List<Role> findAll();
    long count();
    Role findByName(String name);
    Role findById(int id);
    void deleteById(int id);
    boolean existsByName(String name);
//    Iterable<Role> saveAll(Iterable<Role> roles);
}
