package com.template.springjwtsecurity.services;

import com.template.springjwtsecurity.models.AppUser;
import com.template.springjwtsecurity.repositories.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService {
    @Autowired
    private AppUserRepository appUserRepository;

    public long count() { return this.appUserRepository.count(); }

    public List<AppUser> getAll() { return this.appUserRepository.findAll(); }

    public void saveAppUser(AppUser user) {
        this.appUserRepository.save(user);
    }

    public AppUser getByUsername(String username) {
        return this.appUserRepository.findByUsername(username);
    }

    public AppUser getById(int id) { return this.appUserRepository.findById(id); }

    public boolean isUsernameUsed(String username) {
        return this.appUserRepository.existsByUsername(username);
    }

    public boolean isEmailUsed(String email) {
        return this.appUserRepository.existsByEmail(email);
    }

    public int getUserId(String username) { return this.getByUsername(username).getId(); }
}

