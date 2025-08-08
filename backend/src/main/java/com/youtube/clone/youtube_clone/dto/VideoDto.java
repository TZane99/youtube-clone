package com.youtube.clone.youtube_clone.dto;

import java.util.Set;

import com.youtube.clone.youtube_clone.model.VideoStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VideoDto {
    private String id;
    private String title;
    private String description;
    private Set<String> tags;
    private VideoStatus videoStatus;
    private String thumbnailUrl;
    private String videoUrl;
    private Integer likeCount;
    private Integer dislikeCount;
    private Integer viewCount;

}
