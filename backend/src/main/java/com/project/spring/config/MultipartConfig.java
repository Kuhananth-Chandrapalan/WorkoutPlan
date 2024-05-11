package com.project.spring.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;

@Configuration
public class MultipartConfig {

    @Bean
    public MultipartResolver multipartResolver() {
        StandardServletMultipartResolver multipartResolver = new StandardServletMultipartResolver();
       // multipartResolver.setMaxUploadSizePerFile(DataSize.ofMegabytes(10)); // Set maximum file size (example: 10MB)
       // multipartResolver.setMaxRequestSize(DataSize.ofMegabytes(20)); // Set maximum request size
        return multipartResolver;
    }
}

