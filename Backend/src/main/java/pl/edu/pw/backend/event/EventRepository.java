package pl.edu.pw.backend.event;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.pw.backend.event.projections.ProjectEventDetails;
import pl.edu.pw.backend.event.projections.ProjectIdAndIconFilename;
import pl.edu.pw.backend.event.projections.ProjectIdLatitudeLongitudeIconFilename;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    ProjectIdAndIconFilename findEventIconFilenameById(Long id);

    List<ProjectIdLatitudeLongitudeIconFilename> findAllProjectedBy();

    ProjectEventDetails findProjectEventDetailsById(Long id);
}
