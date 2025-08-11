package com.youtube.clone.youtube_clone.Service;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.youtube.clone.youtube_clone.dto.CommentDto;
import com.youtube.clone.youtube_clone.dto.UploadVideoResponse;
import com.youtube.clone.youtube_clone.dto.VideoDto;
import com.youtube.clone.youtube_clone.model.Comment;
import com.youtube.clone.youtube_clone.model.Video;
import com.youtube.clone.youtube_clone.repository.VideoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final S3Service s3Service;
    private final VideoRepository videoRepository;
    private final UserService userService;

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
        savedVideo.setVideoUrl(videoDto.getVideoUrl());

        videoRepository.save(savedVideo);
        return videoDto;
    }

    public Video getVideoById(String videoId){
        return videoRepository.findById(videoId)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find video by id - " + videoId));
        
    }

    public VideoDto getVideoDetails(String videoId){
        Video savedVideo = getVideoById(videoId);

        increaseViewCount(savedVideo);
        userService.addVideoToHistory(videoId);
        
        return mapVideoDto(savedVideo);
    }

    private void increaseViewCount(Video savedVideo) {
        savedVideo.incrementViewCount();
        videoRepository.save(savedVideo);
    }

    public VideoDto likeVideo(String videoId){
        Video videoById = getVideoById(videoId);

        if (userService.ifLikedVideo(videoId)){
            videoById.decreaseLikes();
            userService.removeFromLikedVideos(videoId);
        }else if(userService.ifDislikedVideo(videoId)){
            videoById.decreaseDislikes();
            userService.removeFromDislikedVideos(videoId);
            videoById.incrementLikes();
            userService.addToLikedVideos(videoId);
        }else{
            videoById.incrementLikes();
            userService.addToLikedVideos(videoId);
        }

        videoRepository.save(videoById);

        return mapVideoDto(videoById);


        
    }

    public VideoDto dislikeVideo(String videoId){
        Video videoById = getVideoById(videoId);
        
        if (userService.ifDislikedVideo(videoId)){
            videoById.decreaseDislikes();
            userService.removeFromDislikedVideos(videoId);
        }else if(userService.ifLikedVideo(videoId)){
            videoById.decreaseLikes();
            userService.removeFromLikedVideos(videoId);
            videoById.incrementDislikes();
            userService.addToDislikedVideos(videoId);
        }else{
            videoById.incrementDislikes();
            userService.addToDislikedVideos(videoId);
        }

        videoRepository.save(videoById);

        return mapVideoDto(videoById);

    }

    private VideoDto mapVideoDto(Video video){
        VideoDto videoDto = new VideoDto();
        videoDto.setVideoUrl(video.getVideoUrl());
        videoDto.setThumbnailUrl(video.getThumbnailUrl());
        videoDto.setId(video.getId());
        videoDto.setTitle(video.getTitle());
        videoDto.setDescription(video.getDescription());
        videoDto.setTags(video.getTags());
        videoDto.setVideoStatus(video.getVideoStatus());
        videoDto.setLikeCount(video.getLikes().get());
        videoDto.setDislikeCount(video.getDisLikes().get());
        videoDto.setViewCount(video.getViewCount().get());

        return videoDto;
    }

    public void addComment(String videoId, CommentDto commentDto) {
        Video video = getVideoById(videoId);

        Comment comment =  new Comment();

        comment.setText(commentDto.getText());
        comment.setAuthorId(commentDto.getAuthorId());
        comment.setLikeCount(commentDto.getLikeCount());
        comment.setDisLikeCount(commentDto.getDisLikeCount());

        video.addComment(comment);

        videoRepository.save(video);
    }

    public List<CommentDto> getComments(String videoId) {
        Video video = getVideoById(videoId);

        List<Comment> commentList = video.getCommentList();

        return commentList.stream().map(this::mapToCommentDto).toList();
    }

    private CommentDto mapToCommentDto(Comment comment){
        CommentDto commentDto = new CommentDto();
        commentDto.setText(comment.getText());
        commentDto.setAuthorId(comment.getAuthorId());
        commentDto.setLikeCount(comment.getLikeCount());
        commentDto.setDisLikeCount(comment.getDisLikeCount());

        return commentDto;
    }

    public List<VideoDto> getVideos() {
        return videoRepository.findAll().stream().map(this::mapVideoDto).toList();
    }
    
}
