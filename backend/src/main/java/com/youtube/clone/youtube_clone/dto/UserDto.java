package com.youtube.clone.youtube_clone.dto;

import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String emailAddress;
    private String sub;
    private String channelName;
    private boolean firstTimeUser;
    private String address;
    private String phoneNumber;
    private Set<String> subscribedToUsers;
    private Set<String> subscribers;
    private Set<String> videoHistory;
    private Set<String> likedVideos ;
    private Set<String> dislikedVideos;



    public boolean getFirstTimeUser(){
        return firstTimeUser;
    }
    
}
