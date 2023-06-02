package pl.edu.pw.backend.event.dto.geojson;

import lombok.Data;
import pl.edu.pw.backend.event.projections.ProjectIdLatitudeLongitudeIconFilename;

@Data
public class EventGeoJsonProperties {
    private Long id;
    private String icon;

    public EventGeoJsonProperties(ProjectIdLatitudeLongitudeIconFilename projectIdLatitudeLongitudeIconFilename) {
        this.id = projectIdLatitudeLongitudeIconFilename.getId();
        this.icon = projectIdLatitudeLongitudeIconFilename.getIconFilename();
    }
}
