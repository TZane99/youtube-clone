package com.youtube.clone.youtube_clone.controller;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.youtube.clone.youtube_clone.Service.VideoService;
import com.youtube.clone.youtube_clone.dto.UploadVideoResponse;
import com.youtube.clone.youtube_clone.dto.VideoDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;
    
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UploadVideoResponse uploadVideo(@RequestParam("file") MultipartFile file){

        return videoService.uploadVideo(file);

    }

    @PostMapping("/thumbnail")
    @ResponseStatus(HttpStatus.CREATED)
    public String uploadThumbnail(@RequestParam("file") MultipartFile file, @RequestParam("videoId") String videoId){

        return videoService.uploadThumbnail(file, videoId);

    }

    @PutMapping
    @ResponseStatus(HttpStatus.OK)
    public VideoDto editVideoMetaData(@RequestBody VideoDto videoDto) {

        return videoService.editVideo(videoDto);

    }
}
