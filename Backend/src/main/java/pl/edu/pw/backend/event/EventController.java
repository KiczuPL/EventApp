package pl.edu.pw.backend.event;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.backend.event.dto.geojson.EventGeoJson;
import pl.edu.pw.backend.event.forms.CreateEventForm;
import pl.edu.pw.backend.event.projections.ProjectEventDetails;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/v1/event")
public class EventController {

    private final EventService eventService;

    @Value("classpath:eventIcons/*")
    private Resource[] resources;

    @PostMapping
    public Event addEvent(@RequestBody CreateEventForm form) {
        return eventService.addEvent(form);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }

    @GetMapping("/{id}")
    public ProjectEventDetails getEventDetails(@PathVariable Long id) {
        return eventService.getEventDetails(id);
    }

    @GetMapping("/geoJson")
    public EventGeoJson getAllEventsGeoJson() {
        return eventService.getAllEventsGeoJson();
    }

    @GetMapping(value = "/{id}/icon", produces = MediaType.IMAGE_JPEG_VALUE)
    @ResponseBody
    public ResponseEntity<byte[]> getEventIcon(@PathVariable Long id) throws IOException {
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(eventService.getEventIcon(id));
    }

    @GetMapping("/icons")
    @ResponseBody
    public List<String> getEventIcons() {
        return Arrays.stream(resources).map(resource -> Objects.requireNonNull(resource.getFilename()).split("\\.")[0]).collect(Collectors.toList());
    }

    @GetMapping("/icons/{filename}")
    @ResponseBody
    public ResponseEntity<byte[]> getIcon(@PathVariable String filename) throws IOException {
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_PNG)
                .body(eventService.getIcon(filename));
    }


    @DeleteMapping
    public void deleteEvent(Long id) {
        eventService.deleteEvent(id);
    }
}
