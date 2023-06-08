package pl.edu.pw.backend.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.event.Event;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
//@Table(name="appuser",
//uniqueConstraints = @UniqueConstraint(
//        name = "unique_id",
//        columnNames="id"
//))
public class AppUser {
    @Id
    private String id;
    @NotEmpty
    private String username;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//    @JoinTable(
//            name = "users_events",
//            joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
//            inverseJoinColumns = @JoinColumn(name = "event_id", referencedColumnName = "id")
//    )
    @Builder.Default
    private Set<Event> events = new HashSet<>();

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
