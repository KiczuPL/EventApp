package pl.edu.pw.backend.event;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import pl.edu.pw.backend.event.dto.geojson.EventGeoJson;
import pl.edu.pw.backend.event.forms.CreateEventForm;
import pl.edu.pw.backend.event.projections.ProjectEventDetails;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private/event")
public class EventController {

    private final EventService eventService;

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

    @PostMapping("/create")
    public Event createEvent(@RequestBody CreateEventForm form) {
        return eventService.addEvent(form);
    }


    @DeleteMapping
    public void deleteEvent(Long id) {
        eventService.deleteEvent(id);
    }
}
