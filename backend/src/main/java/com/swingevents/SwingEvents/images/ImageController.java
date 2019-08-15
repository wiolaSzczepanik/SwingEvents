package com.swingevents.SwingEvents.images;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.net.URL;
import java.util.concurrent.TimeUnit;

@RestController
@Slf4j
public class ImageController {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ImageFetchingService imageFetchingService;

    @RequestMapping("/images/{eventId}")
    public ResponseEntity<Resource> eventImages(@PathVariable("eventId") Integer eventId) {
        EventImages images = imageRepository.findById(eventId).orElseThrow(ResourceNotFoundException::new);

        if (images.getMain() == null) {
            throw new ResourceNotFoundException();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + eventId + ".jpg\"")
                .cacheControl(CacheControl.maxAge(1, TimeUnit.DAYS))        // TODO: improve caching, etags etc
                .body(new ByteArrayResource(images.getMain()));
    }


    @RequestMapping(value = "/admin/images/{eventId}/upload", method = RequestMethod.POST)
    public void uploadImage(@PathVariable("eventId") Integer eventId, @RequestBody UploadRequest uploadRequest) throws Exception {
        imageFetchingService.uploadImage(eventId, uploadRequest.getUrl());
    }

    @ResponseStatus(value = HttpStatus.NOT_FOUND)
    private static class ResourceNotFoundException extends RuntimeException {}
}
