package pl.edu.pw.backend.chat.dto;

import java.time.ZonedDateTime;

public interface ChatLineProjection {
    Long getId();

    String getMessage();

    ZonedDateTime getCreatedAt();

    ChatUserProjection getSender();
}
