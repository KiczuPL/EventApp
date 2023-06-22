package pl.edu.pw.backend.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.edu.pw.backend.chat.dao.ChatUser;

public interface ChatUserRepository extends JpaRepository<ChatUser, String> {
}
