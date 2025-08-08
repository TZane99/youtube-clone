package com.youtube.clone.youtube_clone.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.youtube.clone.youtube_clone.model.User;

public interface UserRepository extends MongoRepository<User, String>{

    Optional<User> findBySub(String sub);
    
}