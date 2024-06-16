package com.project.empmgtsys.repository;

import com.project.empmgtsys.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);
}

