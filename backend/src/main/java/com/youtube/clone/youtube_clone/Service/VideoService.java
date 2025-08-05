package com.youtube.clone.youtube_clone.Service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.youtube.clone.youtube_clone.dto.UploadVideoResponse;
import com.youtube.clone.youtube_clone.dto.VideoDto;
import com.youtube.clone.youtube_clone.model.Video;
import com.youtube.clone.youtube_clone.repository.VideoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;

    public UploadVideoResponse uploadVideo(MultipartFile multipartFile){
        String videoUrl = s3Service.uploadFile(multipartFile);
        var video = new Video();

        video.setVideoUrl(videoUrl);

        Video saveVideo = videoRepository.save(video);
        return new UploadVideoResponse(saveVideo.getId(), saveVideo.getVideoUrl());
        
    }

    public String uploadThumbnail(MultipartFile file, String videoId){
        Video savedVideo = getVideoById(videoId);

        String thumbnailUrl = s3Service.uploadFile(file);
        savedVideo.setThumbnailUrl(thumbnailUrl);

        videoRepository.save(savedVideo);
        return thumbnailUrl;

    }

    public VideoDto editVideo(VideoDto videoDto){
        Video savedVideo = getVideoById(videoDto.getId());

        savedVideo.setTitle(videoDto.getTitle());
        savedVideo.setDescription(videoDto.getDescription());
        savedVideo.setTags(videoDto.getTags());
        savedVideo.setThumbnailUrl(videoDto.getThumbnailUrl());
        savedVideo.setVideoStatus(videoDto.getVideoStatus());

        videoRepository.save(savedVideo);
        return videoDto;
    }

    public Video getVideoById(String videoId){
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find video by id - " + videoId));
        
    }
    
}
