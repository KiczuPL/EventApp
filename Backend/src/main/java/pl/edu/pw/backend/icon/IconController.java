package pl.edu.pw.backend.icon;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Controller
@RequestMapping("api/public/icon")
@RequiredArgsConstructor
public class IconController {
    @Value("classpath:eventIcons/*")
    private Resource[] resources;

    private final IconService iconService;

    @GetMapping()
    @ResponseBody
    public List<String> getEventIcons() {
        return Arrays.stream(resources).map(resource -> Objects.requireNonNull(resource.getFilename()).split("\\.")[0]).collect(Collectors.toList());
    }

    @GetMapping("/{filename}")
    @ResponseBody
    public ResponseEntity<byte[]> getIcon(@PathVariable String filename) throws IOException {
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(iconService.getIcon(filename));
    }
}
