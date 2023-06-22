package pl.edu.pw.backend.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChatChunkDTO {
    private ChatRoomDTO chatRoom;
    private List<ChatLineProjection> lines;
}
