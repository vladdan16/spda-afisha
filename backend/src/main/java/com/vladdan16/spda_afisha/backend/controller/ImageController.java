package com.vladdan16.spda_afisha.backend.controller;

import com.github.loki4j.slf4j.marker.LabelMarker;
import com.vladdan16.spda_afisha.backend.service.ImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
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

    LabelMarker marker = LabelMarker.of("image", () -> imageName);
    log.info(marker, "Found image");

    HttpHeaders httpHeaders = new HttpHeaders();
    httpHeaders.setContentType(MediaType.IMAGE_JPEG);

    return new ResponseEntity<>(bytes, httpHeaders, HttpStatus.OK);
  }
}
