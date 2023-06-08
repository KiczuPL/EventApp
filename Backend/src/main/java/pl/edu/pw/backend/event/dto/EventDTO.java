package pl.edu.pw.backend.event.dto;

import pl.edu.pw.backend.user.projections.UserDTO;

import java.time.ZonedDateTime;

public interface EventDTO {
    Long getId();

    String getTitle();

    String Description();

    Double getLongitude();

    Double getLatitude();

    ZonedDateTime getStartDateTime();

    ZonedDateTime creationDateTime();

    String getIconFilename();

    Integer getMaxParticipants();

    Integer getParticipantsCount();

    UserDTO getOwner();
}
