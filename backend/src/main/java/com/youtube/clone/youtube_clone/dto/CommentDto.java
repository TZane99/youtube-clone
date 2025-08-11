package com.youtube.clone.youtube_clone.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {

    private String text;
    private String authorId;
    private Integer likeCount;
    private Integer disLikeCount;
    
}
