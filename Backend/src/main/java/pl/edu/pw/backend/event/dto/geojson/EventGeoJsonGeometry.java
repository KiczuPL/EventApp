package pl.edu.pw.backend.event.dto.geojson;

import lombok.AllArgsConstructor;
import lombok.Data;
import pl.edu.pw.backend.event.projections.ProjectIdLatitudeLongitudeIconFilename;

@Data
@AllArgsConstructor
public class EventGeoJsonGeometry {
    String type = "Point";
    double[] coordinates;

    public EventGeoJsonGeometry(ProjectIdLatitudeLongitudeIconFilename projectIdLatitudeLongitudeIconFilename) {
        this.coordinates = new double[]{
                projectIdLatitudeLongitudeIconFilename.getLatitude(),
                projectIdLatitudeLongitudeIconFilename.getLongitude()
        };
    }
}
