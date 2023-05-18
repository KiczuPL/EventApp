package pl.edu.pw.backend.event.dto.geojson;

import lombok.Data;

import java.util.List;

@Data
public class EventGeoJson {
    private String type= "FeatureCollection";
    private List<EventGeoJsonFeature> features;

    public EventGeoJson(List<EventGeoJsonFeature> features) {
        this.features = features;
    }
}
