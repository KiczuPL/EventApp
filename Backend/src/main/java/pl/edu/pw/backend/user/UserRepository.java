package pl.edu.pw.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.edu.pw.backend.event.dto.EventDTO;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<AppUser, String> {
    @Query("SELECT e from Event e JOIN e.participants p WHERE p.id = :userId")
    List<EventDTO> findUserEvents(String userId);
}
