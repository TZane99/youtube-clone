package com.youtube.clone.youtube_clone.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.youtube.clone.youtube_clone.dto.UserInfoDTO;
import com.youtube.clone.youtube_clone.model.User;
import com.youtube.clone.youtube_clone.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {
    
    @Value("${auth0.userinfoEndpoint}")
    private String userInfoEndpoint;

    private final UserRepository userRepository;

    public String registerUser(String tokenValue){

        HttpRequest httpRequest = HttpRequest.newBuilder()
                    .GET()
                    .uri(URI.create(userInfoEndpoint))
                    .setHeader("Authorization", String.format("Bearer %s", tokenValue))
                    .build();

        HttpClient httpClient = HttpClient.newBuilder()
                    .version(HttpClient.Version.HTTP_2)
                    .build();

        try{
            HttpResponse<String> responseString = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());
            String body = responseString.body();
            
            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            UserInfoDTO userInfoDTO = objectMapper.readValue(body, UserInfoDTO.class);

            Optional<User> userBySub = userRepository.findBySub(userInfoDTO.getSub());

            if(userBySub.isPresent()){
                return userBySub.get().getId();
            } else {
                User user = new User();
                user.setFirstName(userInfoDTO.getGivenName());
                user.setLastName(userInfoDTO.getFamilyName());    
                user.setFullName(userInfoDTO.getName()); 
                user.setEmailAddress(userInfoDTO.getEmail());
                user.setSub(userInfoDTO.getSub());
                user.setFirstTimeUser(true);

                return userRepository.save(user).getId();

            }
            
            

        }catch (Exception exception){
            throw new RuntimeException("Exception occured while registering user", exception);
        }
        


    }
}
