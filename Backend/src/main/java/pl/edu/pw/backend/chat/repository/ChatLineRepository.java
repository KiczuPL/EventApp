package pl.edu.pw.backend.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.backend.chat.dao.ChatLine;
import pl.edu.pw.backend.chat.dto.ChatLineProjection;

public interface ChatLineRepository extends JpaRepository<ChatLine, Long> {

    ChatLineProjection getChatLineById(Long id);
}
