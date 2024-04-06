package com.vladdan16.spda_afisha.backend.service;

import com.vladdan16.spda_afisha.backend.domain.exceptions.BadRequestException;
import com.vladdan16.spda_afisha.backend.domain.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageService {
  private final static String UPLOAD_DIR = "images/";

  public String storeImage(MultipartFile file) {
    try {
      if (file.isEmpty()) {
        throw new BadRequestException("File is empty");
      }

      String imageName = UUID.nameUUIDFromBytes(file.getBytes()).toString();
      Path destinationPath = Paths.get(UPLOAD_DIR, imageName);
      file.transferTo(destinationPath);

      return destinationPath.getFileName().toString();
    } catch (IOException e) {
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
}
