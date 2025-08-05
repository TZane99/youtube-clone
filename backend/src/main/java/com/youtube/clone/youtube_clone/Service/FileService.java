package com.youtube.clone.youtube_clone.Service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String uploadFile(MultipartFile file);
}
