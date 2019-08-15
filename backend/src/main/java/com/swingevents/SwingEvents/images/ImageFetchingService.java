package com.swingevents.SwingEvents.images;

import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.net.URL;

@Service
public class ImageFetchingService {

    @Autowired
    private ImageRepository imageRepository;

    public void uploadImage(Integer eventId, String url) throws Exception {
        InputStream stream = new URL(url).openStream();
        imageRepository.save(new EventImages(eventId, IOUtils.toByteArray(stream)));
        stream.close();
    }

}
