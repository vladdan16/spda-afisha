package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.domain.exceptions.BadRequestException;
import com.vladdan16.spda_afisha.backend.domain.exceptions.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
public class ImageService {
  private final static String UPLOAD_DIR = "images/";

  public String storeImage(MultipartFile file) {
    try {
      if (file.isEmpty()) {
        throw new BadRequestException("File is empty");
      }
      log.info("filename {}", file.getOriginalFilename());
      String originalFileName = file.getOriginalFilename();
      if (originalFileName == null) {
        throw new RuntimeException();
      }
      String extension = originalFileName.substring(originalFileName.lastIndexOf('.'));
      String imageName = UUID.nameUUIDFromBytes(file.getBytes()) + extension;
      Path destinationPath = Paths.get(UPLOAD_DIR, imageName);

      File dir = new File(UPLOAD_DIR);
      if (!dir.exists() && !dir.mkdir()) {
        throw new RuntimeException("Unable to create dir");
      }

      Files.write(destinationPath, file.getBytes());
      return destinationPath.getFileName().toString();
    } catch (IOException e) {
      log.error("File Error: {}", e.toString());
      throw new RuntimeException("Failed to store file", e);
    }
  }

  public byte[] getImage(String imageName) {
    try {
      Path imagePath = Paths.get(UPLOAD_DIR, imageName);
      return Files.readAllBytes(imagePath);
    } catch (IOException e) {
      throw new NotFoundException("Image not found");
    }
  }

  public void deleteImage(String imageName) {
    try {
      Files.deleteIfExists(Paths.get(UPLOAD_DIR, imageName));
    } catch (IOException e) {
      throw new NotFoundException("Image not found");
    }
  }

  public void deleteAllImages(List<String> images) {
    for (var image : images) {
      deleteImage(image);
    }
  }
}
