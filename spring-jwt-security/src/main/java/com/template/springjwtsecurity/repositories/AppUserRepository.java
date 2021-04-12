package com.template.springjwtsecurity.repositories;

import com.template.springjwtsecurity.models.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Integer> {
     List<AppUser> findAll();
     AppUser findById(int id);
     AppUser findByUsername(String username);
     AppUser findByEmail(String email);
     long count();
     boolean existsByUsername(String username);
     boolean existsByEmail(String email);
}
