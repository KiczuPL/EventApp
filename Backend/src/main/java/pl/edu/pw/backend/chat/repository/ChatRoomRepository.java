package pl.edu.pw.backend.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.backend.chat.dao.ChatRoom;
import pl.edu.pw.backend.chat.dto.ChatRoomProjection;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    ChatRoomProjection getChatRoomById(Long roomId);
}
