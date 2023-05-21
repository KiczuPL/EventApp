package pl.edu.pw.backend.event;

import pl.edu.pw.backend.event.dto.geojson.EventGeoJson;
import pl.edu.pw.backend.event.forms.CreateEventForm;
import pl.edu.pw.backend.event.projections.ProjectEventDetails;

import java.io.IOException;
import java.util.List;


public interface EventService {

    Event addEvent(CreateEventForm form);

    List<Event> getAllEvents();
    void deleteEvent(Long id);

    byte[] getEventIcon(Long id) throws IOException;

    EventGeoJson getAllEventsGeoJson();

    ProjectEventDetails getEventDetails(Long id);

    byte[] getIcon(String filename) throws IOException;
}
