package com.vladdan16.spda_afisha.backend.controller;

import com.vladdan16.spda_afisha.backend.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/images")
@RequiredArgsConstructor
public class ImageController {
  private final ImageService imageService;

  /**
   * Returns image by given image name
   *
   * @param imageName String image name
   * @return Image in bytes
   */
  @GetMapping("/{imageName}")
  public ResponseEntity<byte[]> getImage(@PathVariable String imageName) {
    byte[] bytes = imageService.getImage(imageName);

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.IMAGE_JPEG);

    return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
  }
}
