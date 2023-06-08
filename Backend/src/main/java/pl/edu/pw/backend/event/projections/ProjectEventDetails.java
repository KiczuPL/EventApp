package pl.edu.pw.backend.event.projections;

import pl.edu.pw.backend.user.projections.UserDTO;

import java.time.ZonedDateTime;
import java.util.Set;

public interface ProjectEventDetails {
    Long getId();

    String getTitle();

    String getDescription();

    Double getLatitude();

    Double getLongitude();

    ZonedDateTime getStartDateTime();

    UserDTO getOwner();

    Set<UserDTO> getParticipants();

    Integer getParticipantsCount();

}
