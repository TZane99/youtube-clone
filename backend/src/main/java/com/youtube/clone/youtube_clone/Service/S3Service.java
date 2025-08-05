package com.youtube.clone.youtube_clone.Service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class S3Service implements FileService {

    private final AmazonS3 awS3Client;
    public static final String BUCKET_NAME = "tzane99-youtube-clone";

    @Override
    public String uploadFile(MultipartFile file){
        var fileNameExtension = StringUtils.getFilenameExtension(file.getOriginalFilename());

        var key = UUID.randomUUID().toString() + "." + fileNameExtension ;

        var metadata = new ObjectMetadata();
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());

        try{
            awS3Client.putObject(BUCKET_NAME, key, file.getInputStream(), metadata);
        }catch(IOException ioException){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "An exception occured while uploading the file");   
        }
        
        awS3Client.setObjectAcl(BUCKET_NAME, key, CannedAccessControlList.PublicRead);

        return awS3Client.getUrl(BUCKET_NAME, key).toString();

    }
}
