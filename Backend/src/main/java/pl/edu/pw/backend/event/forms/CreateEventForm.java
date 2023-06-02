package pl.edu.pw.backend.event.forms;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;

public record CreateEventForm(@NotEmpty String title,
                              @NotEmpty String description,
                              @NotNull ZonedDateTime startDatetime,
                              @NotNull Double longitude,
                              @NotEmpty Double latitude,
                              @NotEmpty String iconFilename,
                              @NotNull Long ownerId) {
}
