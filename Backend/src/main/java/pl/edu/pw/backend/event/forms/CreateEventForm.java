package pl.edu.pw.backend.event.forms;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record CreateEventForm(Long id,
                              @NotEmpty String title,
                              @NotEmpty String description,
                              @NotNull LocalDateTime startDatetime,
                              @NotNull String timeZoneId,
                              @NotNull Double longitude,
                              @NotEmpty Double latitude,
                              @NotEmpty String iconFilename,
                              @NotNull String ownerId,
                              @NotNull Integer maxParticipants) {
}
