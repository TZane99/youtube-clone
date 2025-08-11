package com.youtube.clone.youtube_clone.Service;

import java.util.Set;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import com.youtube.clone.youtube_clone.model.User;
import com.youtube.clone.youtube_clone.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;

    public User getCurrentUser(){
        String sub = ((Jwt)(SecurityContextHolder.getContext().getAuthentication().getPrincipal())).getClaim("sub");

        return userRepository.findBySub(sub)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find user with sub - " + sub));
    }

    public User getTargetUser(String userId){
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Cannot find user with id: " + userId));
    }

    public void addToLikedVideos(String videoId){
        User currentUser = getCurrentUser();
        currentUser.addToLikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public boolean ifLikedVideo(String videoId){
        return getCurrentUser().getLikedVideos().stream().anyMatch(likedVideo -> likedVideo.equals(videoId));
    }

    public boolean ifDislikedVideo(String videoId){
        return getCurrentUser().getDislikedVideos().stream().anyMatch(dislikedVideo -> dislikedVideo.equals(videoId));
    }

    public void removeFromLikedVideos(String videoId){
        User currentUser = getCurrentUser();
        currentUser.removeFromLikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public void removeFromDislikedVideos(String videoId){
        User currentUser = getCurrentUser();
        currentUser.removeFromDislikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public void addToDislikedVideos(String videoId){
        User currentUser = getCurrentUser();
        currentUser.addToDislikedVideos(videoId);
        userRepository.save(currentUser);
    }

    public void addVideoToHistory(String videoId){
        User currentUser = getCurrentUser();
        currentUser.addToVideoHistory(videoId);
        userRepository.save(currentUser);
    }

    public void subscribeUser(String userId){
        User currentUser = getCurrentUser();
        User targetUser = getTargetUser(userId);

        currentUser.addTosubscribedToUsers(userId);

        targetUser.addToSubscribers(currentUser.getId());

        userRepository.save(currentUser);
        userRepository.save(targetUser);

    }

    public void unSubscribeUser(String userId){
        User currentUser = getCurrentUser();
        User targetUser = getTargetUser(userId);

        currentUser.removeFromsubscribedToUsers(userId);

        targetUser.removeFromSubscribers(currentUser.getId());

        userRepository.save(currentUser);
        userRepository.save(targetUser);

    }

    public Set<String> getVideoHistory(String userId) {
        User user = getTargetUser(userId); 
        return user.getVideoHistory();
    }
}
