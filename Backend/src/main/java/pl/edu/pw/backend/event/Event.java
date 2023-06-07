package pl.edu.pw.backend.event;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.edu.pw.backend.user.AppUser;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotEmpty
    private String title;
    @NotEmpty
    private String description;
    @NotNull
    private Double longitude;
    @NotNull
    private Double latitude;
    @NotNull
    private ZonedDateTime startDateTime;

    @NotNull
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ZonedDateTime creationDateTime;

    @NotBlank
    private String iconFilename;

    @NotNull
    private Integer maxParticipants;

    @ManyToMany(fetch = FetchType.EAGER)
    @Builder.Default
    private Set<AppUser> participants = new HashSet<>();
    @NotNull
    @Builder.Default
    private Integer participantsCount=0;
    @ManyToOne
    private AppUser owner;
}