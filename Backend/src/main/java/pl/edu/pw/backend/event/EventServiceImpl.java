package pl.edu.pw.backend.event;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import pl.edu.pw.backend.event.dto.geojson.EventGeoJsonFeature;
import pl.edu.pw.backend.event.dto.geojson.EventGeoJson;
import pl.edu.pw.backend.event.forms.CreateEventForm;
import pl.edu.pw.backend.event.projections.ProjectEventDetails;
import pl.edu.pw.backend.event.projections.ProjectIdLatitudeLongitudeIconFilename;
import pl.edu.pw.backend.user.AppUser;
import pl.edu.pw.backend.user.UserService;

import java.io.IOException;
import java.time.ZonedDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    private final UserService userService;

    @Override
    public Event addEvent(CreateEventForm form) {
        AppUser owner = userService.getUserById(form.ownerId());
        Event event = Event.builder()
                .owner(owner)
                .title(form.title())
                .description(form.description())
                .longitude(form.longitude())
                .latitude(form.latitude())
                .startDateTime(form.startDatetime())
                .creationDateTime(ZonedDateTime.now())
                .iconFilename(form.iconFilename())
                .build();
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
    public byte[] getEventIcon(Long id) throws IOException {
        String iconFilename = eventRepository.findEventIconFilenameById(id).getIconFilename();
        var imgFile = new ClassPathResource("eventIcons/" + iconFilename + ".png");
        return StreamUtils.copyToByteArray(imgFile.getInputStream());
    }

    @Override
    public EventGeoJson getAllEventsGeoJson() {
        List<ProjectIdLatitudeLongitudeIconFilename> events = eventRepository.findAllProjectedBy();
        List<EventGeoJsonFeature> features = events.stream().map(EventGeoJsonFeature::new).toList();
        return new EventGeoJson(features);
    }

    @Override
    public ProjectEventDetails getEventDetails(Long id) {
        return eventRepository.findProjectEventDetailsById(id);
    }
}
