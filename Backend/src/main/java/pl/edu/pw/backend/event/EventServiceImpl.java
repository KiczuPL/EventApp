package pl.edu.pw.backend.event;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import pl.edu.pw.backend.event.dto.geojson.EventGeoJson;
import pl.edu.pw.backend.event.dto.geojson.EventGeoJsonFeature;
import pl.edu.pw.backend.event.forms.CreateEventForm;
import pl.edu.pw.backend.event.projections.ProjectEventDetails;
import pl.edu.pw.backend.event.projections.ProjectIdLatitudeLongitudeIconFilename;
import pl.edu.pw.backend.user.AppUser;
import pl.edu.pw.backend.user.UserService;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final UserService userService;

    @Override
    public Event addEvent(CreateEventForm form) {
        log.warn("Form: {}", form);
        AppUser owner = userService.getUserById(form.ownerId());
        ZonedDateTime zonedDateTime = ZonedDateTime.of(form.startDatetime(), ZoneId.of(form.timeZoneId()));
        Event event = Event.builder()
                .owner(owner)
                .title(form.title())
                .description(form.description())
                .longitude(form.longitude())
                .latitude(form.latitude())
                .startDateTime(zonedDateTime)
                .creationDateTime(ZonedDateTime.now())
                .iconFilename(form.iconFilename())
                .maxParticipants(form.maxParticipants())
                .build();
        log.info("New event created: {}", event);
        return eventRepository.save(event);
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }

    @Override
    public EventGeoJson getAllEventsGeoJson() {
        log.info("Getting geoJSON");
        List<ProjectIdLatitudeLongitudeIconFilename> events = eventRepository.findAllProjectedBy();
        List<EventGeoJsonFeature> features = events.stream().map(EventGeoJsonFeature::new).toList();
        return new EventGeoJson(features);
    }

    @Override
    public ProjectEventDetails getEventDetails(Long id) {
        return eventRepository.findProjectEventDetailsById(id);
    }
}
