package pl.edu.pw.backend.event;

import pl.edu.pw.backend.event.dto.geojson.EventGeoJson;
import pl.edu.pw.backend.event.forms.CreateEventForm;
import pl.edu.pw.backend.event.projections.ProjectEventDetails;

import java.util.List;


public interface EventService {

    Event addEvent(CreateEventForm form);

    List<Event> getAllEvents();

    void deleteEvent(Long id);

    EventGeoJson getAllEventsGeoJson();

    ProjectEventDetails getEventDetails(Long id);

    void assignUserToEvent(String participantId, Long eventId);

    void signOutUserFromEvent(String participantId, Long id);

    Event updateEvent(CreateEventForm form);
}
