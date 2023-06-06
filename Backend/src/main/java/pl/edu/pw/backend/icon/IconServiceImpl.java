package pl.edu.pw.backend.icon;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;

import java.io.IOException;

@Service
public class IconServiceImpl implements IconService {
    @Override
    public byte[] getIcon(String filename) throws IOException {
        var imgFile = new ClassPathResource("eventIcons/" + filename + ".png");
        return StreamUtils.copyToByteArray(imgFile.getInputStream());
    }
}
