package com.youtube.clone.youtube_clone.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AwsS3Config {

    @Value("${spring.cloud.aws.credentials.access-key}")
    private String awsAccessKey;
    @Value("${spring.cloud.aws.credentials.secret-key}")
    private String awsSecretKey;

    @Bean
    public AmazonS3 amazonS3(){
        BasicAWSCredentials awsCreds = new BasicAWSCredentials(awsAccessKey, awsSecretKey);

        return AmazonS3ClientBuilder.standard()
            .withRegion("us-east-2")
            .withCredentials(new AWSStaticCredentialsProvider(awsCreds))
            .build();
    }
}
