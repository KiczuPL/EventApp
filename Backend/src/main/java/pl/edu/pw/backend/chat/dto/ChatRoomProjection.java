package pl.edu.pw.backend.chat.dto;

import java.util.List;

public interface ChatRoomProjection {
    Long getId();

    String getName();

    List<ChatLineProjection> getLines();
}
