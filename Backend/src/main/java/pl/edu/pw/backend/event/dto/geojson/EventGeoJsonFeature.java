package pl.edu.pw.backend.event.dto.geojson;

import lombok.RequiredArgsConstructor;
import pl.edu.pw.backend.event.projections.ProjectIdLatitudeLongitudeIconFilename;

@RequiredArgsConstructor
public class EventGeoJsonFeature {
    private String type = "Feature";
    private EventGeoJsonGeometry geometry;
    private EventGeoJsonProperties properties;

    public EventGeoJsonFeature(EventGeoJsonGeometry geometry, EventGeoJsonProperties properties) {
        this.geometry = geometry;
        this.properties = properties;
    }

    public EventGeoJsonFeature(ProjectIdLatitudeLongitudeIconFilename projectIdLatitudeLongitudeIconFilename) {
        this.geometry = new EventGeoJsonGeometry(projectIdLatitudeLongitudeIconFilename);
        this.properties = new EventGeoJsonProperties(projectIdLatitudeLongitudeIconFilename);
    }

    public String getType() {
        return type;
    }

    public EventGeoJsonGeometry getGeometry() {
        return geometry;
    }

    public EventGeoJsonProperties getProperties() {
        return properties;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setGeometry(EventGeoJsonGeometry geometry) {
        this.geometry = geometry;
    }

    public void setProperties(EventGeoJsonProperties properties) {
        this.properties = properties;
    }

    @Override
    public String toString() {
        return "EventGeoJsonFeature{" +
                "type='" + type + '\'' +
                ", geometry=" + geometry +
                ", properties=" + properties +
                '}';
    }
}
