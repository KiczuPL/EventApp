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
        event.getParticipants().add(owner);
        event.setParticipantsCount(1);
        event = eventRepository.save(event);
        log.info("New event created: {}", event);
        return event;
    }

    @Override
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    @Override
    public void deleteEvent(Long id) {

        log.info("Deleting event with id: {}", id);
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
        ProjectEventDetails event = eventRepository.findProjectEventDetailsById(id);
        log.info("Getting event details: {}", event);
        return event;
    }

    @Override
    public void assignUserToEvent(String participantId, Long eventId) {
        Event event = eventRepository.findById(eventId).orElseThrow();
        AppUser participant = userService.getUserById(participantId);
        log.info("event: {}", event);
        event.getParticipants().add(participant);
        event.setParticipantsCount(event.getParticipantsCount() + 1);
        eventRepository.save(event);
        log.info("User {} assigned to event {}", participantId, eventId);
    }

    @Override
    public void signOutUserFromEvent(String participantId, Long eventId) {
        log.info("unassigning user {} from event {}", participantId, eventId);
        Event event = eventRepository.findById(eventId).orElseThrow();
        AppUser participant = userService.getUserById(participantId);
        event.getParticipants().remove(participant);
        event.setParticipantsCount(event.getParticipantsCount() - 1);
        eventRepository.save(event);
        log.info("User {} unassigned from event {}", participantId, eventId);
    }

    @Override
    public Event updateEvent(CreateEventForm form) {
        AppUser owner = userService.getUserById(form.ownerId());
        ZonedDateTime zonedDateTime = ZonedDateTime.of(form.startDatetime(), ZoneId.of(form.timeZoneId()));
        Event event = eventRepository.getReferenceById(form.id());
        event.setTitle(form.title());
        event.setDescription(form.description());
        event.setStartDateTime(zonedDateTime);
        event.setLongitude(form.longitude());
        event.setLatitude(form.latitude());
        event.setIconFilename(form.iconFilename());
        event.setMaxParticipants(form.maxParticipants());

        log.info("Event updated: {}", event);
        return eventRepository.save(event);
    }
}
