package pl.edu.pw.backend.event.projections;

import pl.edu.pw.backend.user.projections.ProjectUser;

import java.time.ZonedDateTime;

public interface ProjectEventDetails {
    Long getId();
    String getTitle();
    String getDescription();
    Double getLatitude();
    Double getLongitude();
    ZonedDateTime getStartDateTime();
    ProjectUser getOwner();

}
