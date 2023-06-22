package pl.edu.pw.backend.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChatRoomDTO {
    private Long id;
    private String name;

}
