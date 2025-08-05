package com.youtube.clone.youtube_clone.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.youtube.clone.youtube_clone.model.Video;

public interface VideoRepository extends MongoRepository<Video, String> {
    
}
